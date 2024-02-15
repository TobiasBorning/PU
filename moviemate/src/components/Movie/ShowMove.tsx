import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Movie.css';
import { get } from 'http';
import { getMovie, Movie } from '../../utils/movieUtils/fetchAndFillDb';


function ShowMovie() {
    const location = useLocation();
    const number = location.state?.number;
    const [movie, setMovie] = useState<Movie>({
        title: 'Loading...',
    });

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
        <div className='moviecontainer'>
            <h1> {movie.title}</h1>
            <p> Year: {movie.year}<br></br>
                Genres: {movie.genres}<br></br>
                Actors: {movie.actors}<br></br>
                Director: {movie.director}<br></br>
                Plot: {movie.plot}<br></br><br></br><br></br>
                <img src={movie.posterUrl} alt=''/>
            </p>
        </div>
    );
}

export default ShowMovie;