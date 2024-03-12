import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ShowMovie.css';
import { getMovie, Movie } from '../../utils/movieUtils/fetchAndFillDb';
import { auth } from '../../config/firebase';
import { addMovieToUser, isInMyMovies, removeMovieFromUser } from '../../utils/user/users'
import YouTube from 'react-youtube';
import ReviewMovie from './ReviewMovie';

function ShowMovie() {
    const location = useLocation();
    const number = location.state?.number;
    const [movie, setMovie] = useState<Movie>({
        title: 'Loading...',
    });
    const navigate = useNavigate();
    const [isInList, setIsInList] = useState(false);
    const [trailerId, setTrailerId] = useState<string>('');
    const [showTrailer, setShowTrailer] = useState<boolean>(false);

    useEffect(() => {
        const fetchMovie = async () => {
            if (number !== undefined) {
                const movie = await getMovie(number.toString());
                setMovie(movie);
                const authUser = auth.currentUser;
                if (authUser && movie.id) {
                    isInMyMovies(authUser.uid, movie.id).then((contains) => {
                        setIsInList(contains);
                    });
                
                    if (movie.trailerUrl) {
                        const urlParams = new URLSearchParams(movie.trailerUrl.split('?')[1]);
                        const videoId = urlParams.get('v');
                        if (videoId) {
                            setTrailerId(videoId);
                        }
                    }
                }

            }
            else {
                setMovie({
                    title: 'Error',
                })
            }
        };
        fetchMovie();
    }, [number]);

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
    };


    return (
        <div className='container'>
            <div className='movieInfo'>
                <h1> {movie.title}</h1>
                <p>Year: {movie.year}</p>
                <p>Genres: {movie.genres?.join(", ")}</p>
                <p>Actors: {movie.actors?.join(", ")}</p>
                <p>Director: {movie.director}</p>
                <p>Plot: {movie.plot}</p>
                <img src={movie.posterUrl} alt='' />
                <br />
                <button onClick={() => addOrRemove()}>
                    {isInList ? 'Remove from my list' : 'Add to my list'}
                </button>
                <ReviewMovie />
                <button onClick={() => setShowTrailer(true)}>Show Trailer</button>
                <br />
                {showTrailer && <YouTube videoId={trailerId} opts={{ width: '500', height: '285' }} />}
            </div>
            <button onClick={() => navigate('/main')}>Go back</button>
        </div>
    );
}

export default ShowMovie;