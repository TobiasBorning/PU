import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Movie.css';
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
        <div className='moviecontainer'>
            <h1> {movie.title}</h1>
            <p> Year: {movie.year}<br></br>
                Genres: {movie.genres?.join(", ")}<br></br>
                Actors: {movie.actors?.join(", ")}<br></br>
                Director: {movie.director}<br></br>
                Plot: {movie.plot}<br></br><br></br><br></br>
                <img src={movie.posterUrl} alt=''/>
            </p>
            <button onClick={() => navigate('/ScrollingComponent')}>Go back</button>
        </div>
    );
}

export default ShowMovie;