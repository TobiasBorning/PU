import React, { useEffect, useState } from 'react';
import { Movie, getMovie } from '../../utils/movieUtils/fetchAndFillDb';
import HoverButton from './HoverButton';

interface Props {
    movieId: number; // replace 'any' with the type of your prop
}

const GenresAndDirectorsButtons: React.FC<Props> = ({ movieId }) => {

    const [movie, setMovie] = useState<Movie>();
    const [directors, setDirectors] = useState<JSX.Element[]>([]);
    const [genres, setGenres] = useState<JSX.Element[]>([]);

    useEffect(() => {
        // Your code here
        getMovie(movieId.toString()).then((movie) => {
            setMovie(movie);
        });
        makeDirectorButtons();
        makeGenreButtons();
    });


    const makeDirectorButtons = () => {
        if (movie && movie.director) {
            setDirectors(movie.director.map((director) => {
                return (
                    <HoverButton text={director}/>
                );
            }));
        }       
    }

    const makeGenreButtons = () => {
        if (movie && movie.genres) {
            setGenres(movie.genres.map((genres) => {
                return (
                    <HoverButton text={genres}/>
                );
            }));
        }
    }


    return (
        <div>
            <p>Director: {directors}</p>
            <p>Genres: {genres}</p>
        </div>
    );
}

export default GenresAndDirectorsButtons;

