import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ShowMovie.css';
import { getMovie, Movie } from '../../utils/movieUtils/fetchAndFillDb';


function ShowMovie() {
    const location = useLocation();
    const number = location.state?.number;
    const [movie, setMovie] = useState<Movie>({
        title: 'Loading...',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            if (number !== undefined) {
                const movie = await getMovie(number.toString());
                setMovie(movie);
            }
            else {
                setMovie({
                    title: 'Error',
                })
            }
        };
        fetchMovie();
    });

    return (
        <div className='container'>
            <div className='movieInfo'>
                <h1> {movie.title}</h1>
                <p>Year: {movie.year}</p>
                <p>Genres: {movie.genres?.join(", ")}</p>
                <p>Actors: {movie.actors?.join(", ")}</p>
                <p>Director: {movie.director}</p>
                <p>Plot: {movie.plot}</p>
                <img src={movie.posterUrl} alt=''/>     
                <br />
                <button onClick={() => navigate('/main')}>Go back</button>                
            </div> 
        </div>
    );
}

export default ShowMovie;