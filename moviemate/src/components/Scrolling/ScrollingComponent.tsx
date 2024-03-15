import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollingComponent.css';
import { getMovies, Movie } from '../../utils/movieUtils/fetchAndFillDb';
import { getUserMovies } from '../../utils/user/users';
import { getMovieByGenreOr } from '../../utils/searchUtils/searchFunctions';
import { getMovieByName } from '../../utils/searchUtils/searchFunctions';


type Props = {
    containerType: string;
    uid?: string;
   searchQuery?: string; // Legg til søkestrengen som et valgfritt props

    selectedGenres?: string[];
    updateTrigger?: number; // Bruker nå updateTrigger som er en teller
};


const ScrollingComponent: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [boxArray, setBoxArray] = useState<JSX.Element[]>([]);
    const [movieCount, setMovieCount] = useState<number>(20);


    // henter filmer fra databasen
    useEffect(() => {
        chooseFill();
    }, [movieCount]);

    useEffect(() => {
        if (props.searchQuery) {
            searchMovies(props.searchQuery);
        } else {
            chooseFill();
        }
    }, [props.searchQuery]);

    const searchMovies = (query: string) => {
        // Implementer søkefunksjonalitet basert på tittel eller regissør
        getMovieByName(query).then((movies: Movie[]) => {
            setMovieList(movies);
            fillContainer();
        }).catch((error) => {
            console.error('Error searching movies:', error);
        });
    }

    // fyller container med filmer når filmene er hentet
    useEffect(() => {
        fillContainer();
    }, [movieList]);

    // fyller container med filmer sortert etter sjanger nå man klikekr på filter-knapp
    useEffect(() => {
        chooseFill();
    }, [props.updateTrigger]); // Du kan legge til flere avhengigheter hvis nødvendig


    // navigerer til en filmside
    const goToMovie = (number: number) => {
        navigate('/movie', { state: { number } });
    }

    // fyller container med alle filmer
    const fillContainer = () => {
        const b = movieList.map((movie) => (
            <div key={movie.id} className="box" onClick={() => {
                if (movie.id !== undefined) {
                    goToMovie(parseInt(movie.id));
                } else {
                    console.error("Movie ID is undefined");
                }
            }}>
                <h3>{`${movie.title}`}</h3>
                <img src={movie.posterUrl} alt="" />
            </div>
        ));
        setBoxArray(b);
    }

    const fillAllMovies = () => {
        console.log("Fill with all movies");
        if (movieList.length >= 0) {
            console.log(getMovies(movieCount));
            getMovies(movieCount).then((movies) => {
                console.log(movies);
                setMovieList(movies);
                fillContainer();
            });
        }
    }

    const fillWithUsersMovies = async () => {
        console.log("Fill with user movies");
        if (props.uid) {
            console.log(getUserMovies(props.uid));
            getUserMovies(props.uid).then((movies: Movie[]) => {
                console.log(movies);
                setMovieList(movies);
                fillContainer();
            }).catch((error) => {
                console.error('Error getting user movies:', error);
            });
        }
    }


    const selectGenre = () => {
        if (props.selectedGenres && props.selectedGenres.length > 0) {
            getMovieByGenreOr(props.selectedGenres).then(filteredMovies => {
                setMovieList(filteredMovies);
                fillContainer();
            });
        } else {
            fillAllMovies();
        }
    };


    const chooseFill = () => {
        switch (props.containerType) {
            case "default":
                fillAllMovies();
                break;
            case "userList":
                fillWithUsersMovies();
                break;
            case "genre":
                if (props.selectedGenres && props.selectedGenres.length > 0) {
                    selectGenre();
                } else {
                    fillAllMovies();
                }
                break;
        }
    };


    // øker filmer med 20
    // TODO: oppdaterer ikke før 2 klikk
    const increaseMovieCount = () => {
        setMovieCount(movieCount + 20);
        console.log(movieCount);
        chooseFill();
    }

    return (
        <div>
            <div className="scrollingContainer">
                {boxArray}
            </div>
            <br />
            <button id="leftCentered" onClick={increaseMovieCount}>Load more movies..</button>
        </div>
    );
}

export default ScrollingComponent;