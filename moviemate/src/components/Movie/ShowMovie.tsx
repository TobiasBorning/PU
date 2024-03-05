import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ShowMovie.css';
import { getMovie, Movie } from '../../utils/movieUtils/fetchAndFillDb';
import { auth } from '../../config/firebase';
import { Ræting, getMovieReview, Comment } from './Comment&RateMovie/Ræting';
import { addMovieToUser, getUserMovies, isInMyMovies, removeMovieFromUser } from '../../utils/user/users';

function ShowMovie() {
    const location = useLocation();
    const movieId = location.state?.number;
    const [movie, setMovie] = useState<Movie>({
        title: 'Loading...',
    });
    const [review, setReview] = useState<Ræting>({
        rating: 0,
        comment: '',
    });
    const navigate = useNavigate();
    const [isInList,setIsInList] = useState(false);

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

    useEffect(() => {
        const fetchReview = async () => {
            if (movieId !== undefined && auth.currentUser) {
                console.log("Fetching review");
                const review = await getMovieReview(auth.currentUser.uid, movieId.toString());
                console.log(review);
                setReview(review); 
            }
            else {
                console.error('Movie ID is undefined or user not logged in');
                setReview({
                    rating: 0,
                    comment: '',
                })
            }
        };
        fetchReview();
    },[auth.currentUser,movieId]);
    
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
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
                <img src={movie.posterUrl} alt=''/> 
                <Comment />
                <img src={movie.posterUrl} alt='' />
                <br />
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