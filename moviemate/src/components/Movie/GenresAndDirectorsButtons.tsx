import React, { useEffect, useState } from 'react';
import { Movie, getMovie } from '../../utils/movieUtils/fetchAndFillDb';
import HoverButton from './HoverButton';
import './GenresAndDirectorsButtons.css';
interface Props {
    movieId: number; // replace 'any' with the type of your prop
}

const GenresAndDirectorsButtons: React.FC<Props> = ({ movieId }) => {

    const [directors, setDirectors] = useState<JSX.Element[]>([]);
    const [genres, setGenres] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const fetchMovie = async () => {
            console.log("Making buttons")
            getMovie(movieId.toString()).then((movie) => {
                makeDirectorButtons(movie);
                makeGenreButtons(movie);
            });

        }
        fetchMovie();
    }, [movieId]);


    const makeDirectorButtons = (movie: Movie) => {
        if (movie && movie.director) {
            setDirectors(movie.director.map((director) => {
                return (
                    <HoverButton text={director} type="director" />
                );
            }));
        }
    }

    const makeGenreButtons = (movie: Movie) => {
        if (movie && movie.genres) {
            setGenres(movie.genres.map((genres) => {
                return (
                    <HoverButton text={genres} type="genre" />
                );
            }));
        }
    }


    return (
        <div className='gnd'>
            <p>Director:</p>
            {directors}
            <p>Genres:</p>
            {genres}
        </div>
    );
}

export default GenresAndDirectorsButtons;

