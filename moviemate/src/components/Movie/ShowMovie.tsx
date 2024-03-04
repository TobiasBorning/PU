import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ShowMovie.css';
import { getMovie, Movie } from '../../utils/movieUtils/fetchAndFillDb';
import { auth } from '../../config/firebase';
import { Ræting, getMovieReview, Comment } from './Comment&RateMovie/Ræting';


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

    useEffect(() => {
        const fetchMovie = async () => {
            if (movieId !== undefined) {
                const movie = await getMovie(movieId.toString());
                setMovie(movie);
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
                <br />
                <button onClick={() => navigate('/main')}>Go back</button>                
            </div> 
        </div>
    );
}

export default ShowMovie;