import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ShowMovie.css';
import { getMovie, Movie } from '../../utils/movieUtils/fetchAndFillDb';
import { auth } from '../../config/firebase';
import { addMovieToUser, isInMyMovies, removeMovieFromUser } from '../../utils/user/users';
import ReviewMovie from './ReviewMovie';
import GenresAndDirectorsButtons from './GenresAndDirectorsButtons';

function ShowMovie() {
    const location = useLocation();
    const movieId = location.state?.number;
    const [movie, setMovie] = useState<Movie>({
        title: 'Loading...',
    });
    const navigate = useNavigate();
    const [isInList,setIsInList] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            console.log("Fetching movie")
            if (movieId !== undefined) {
                const movie = await getMovie(movieId.toString());
                setMovie(movie);
                const authUser = auth.currentUser;
                if (authUser && movie.id) {
                    isInMyMovies(authUser.uid,movie.id).then((contains) => {
                        setIsInList(contains);
                    });
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
    },[movieId, movie.title]);
    
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
                <p>Actors: {movie.actors?.join(", ")}</p>
                <GenresAndDirectorsButtons movieId={movieId} /> 
                <p>Plot: {movie.plot}</p>
                <img src={movie.posterUrl} alt=''/> 
                <br />
                <ReviewMovie />
                <button onClick={() => addOrRemove()}>
                    {isInList ? 'Remove from my list' : 'Add to my list'}
                </button>
                <br />
                <button onClick={() => navigate('/main')}>Go back</button>
            </div>
        </div>
    );
}

export default ShowMovie;