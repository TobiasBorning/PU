import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ShowMovie.css';
import { getMovie, Movie } from '../../utils/movieUtils/fetchAndFillDb';
import { auth } from '../../config/firebase';
import { addMovieToUser, getUserMovies, isInMyMovies, removeMovieFromUser } from '../../utils/user/users';
import Youtube from 'react-youtube'


function ShowMovie() {
    const location = useLocation();
    const movieId = location.state?.number;
    const [movie, setMovie] = useState<Movie>({
        title: 'Loading...',
    });
    const navigate = useNavigate();
    const [isInList,setIsInList] = useState(false);
    const [trailerId, setTrailerId] = useState<string>('');


    useEffect(() => {
        const fetchMovie = async () => {
            if (movieId !== undefined) {
                const movie = await getMovie(movieId.toString());
                setMovie(movie);
                const authUser = auth.currentUser;
                if (authUser && movie.id) {
                    isInMyMovies(authUser.uid,movie.id).then((contains) => {
                        setIsInList(contains);
                    });
                }
                if (movie.trailerUrl) {
                    const urlParams = new URLSearchParams(movie.trailerUrl.split('?')[1]);
                    const videoId = urlParams.get('v');
                    if (videoId) {
                        setTrailerId(videoId);
                    }
                }
            }
            else {
                setMovie({
                    title: 'Error',
                })
            }
        };
        if (movie.title === 'Loading...') {
            fetchMovie();
        }
    });
    
    const linkUserToMovie = () => {
        const authUser = auth.currentUser;
        if (authUser && movie.id) {
            addMovieToUser(authUser.uid, movie.id);
        }
    }
    const removeFromUserList = () => {
        const authUser = auth.currentUser;
        if (authUser && movie.id) {
            removeMovieFromUser(authUser.uid, movie.id);
        }
    }

    const addOrRemove = () => {
        if (isInList) {
            removeFromUserList();
        }
        else {
            linkUserToMovie();
        }
        setIsInList(!isInList);
    }

    return (
        <div className='container'>
            <div className='movieInfo'>
                <h1> {movie.title}</h1>
                <p>Year: {movie.year}</p>
                <p>Genres: {movie.genres?.join(", ")}</p>
                <p>Actors: {movie.actors?.join(", ")}</p>
                <p>Director: {movie.director}</p>
                <p>Plot: {movie.plot}</p>
                {movie.trailerUrl && (
                    <iframe
                        width="560"
                        height="315"
                        src={movie.trailerUrl}
                        title="Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
                <img src={movie.posterUrl} alt=''/> 
                <br />
                <ReviewMovie />
                <button onClick={() => addOrRemove()}>
                    {isInList ? 'Remove from my list' : 'Add to my list'}
                </button>
                <p>Trailer URL: {movie.trailerUrl}</p>
                <br />
                 <YouTube videoId={trailerId} opts={{ width: '400', height: '275' }} />
                <button onClick={() => navigate('/main')}>Go back</button>
            </div>
        </div>
    );
}

export default ShowMovie;

function setTrailerId(videoId: string) {
    throw new Error('Function not implemented.');
}
