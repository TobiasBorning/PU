import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollingComponent.css';
import { getMovies, Movie } from '../../utils/movieUtils/fetchAndFillDb';
import { getUserMovies } from '../../utils/user/users';
import { getMovieByGenreOr } from '../../utils/searchUtils/searchFunctions';
import { getMovieByName } from '../../utils/searchUtils/searchFunctions';
import { simpleRecomendation } from '../../utils/user/recomendation';

type Props = {
    containerType: string;
    uid?: string;
    searchQuery?: Movie[];
    selectedGenres?: string[];
    updateTrigger?: number;
    // favoriteGenres?: string[];
};



const ScrollingComponent: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [boxArray, setBoxArray] = useState<JSX.Element[]>([]);
    const [movieCount, setMovieCount] = useState<number>(20);
    console.log("Container type:", props.containerType);


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


    const searchMovies = (query: Movie[]) => {
        setMovieList(query);
        fillContainer();
    }

    const fillRandomMovieFromFavoriteGenres = async () => {
        const movieList: Movie[] = []
        if (props.uid) {
            const fetchedMovie = await simpleRecomendation(props.uid);
            if (fetchedMovie) {
                movieList.push(fetchedMovie as Movie);
                setMovieList(movieList)
                fillContainer();
            }
        }
    };


    // fyller container med filmer når filmene er hentet
    useEffect(() => {
        fillContainer();
    }, [movieList]);

    // fyller container med filmer sortert etter sjanger nå man klikekr på filter-knapp
    useEffect(() => {
        chooseFill();
    }, [props.updateTrigger]);


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
            case "randomFavoriteGenre":
                fillRandomMovieFromFavoriteGenres();
                break;
        }
    };


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
            {props.containerType !== "randomFavoriteGenre" && props.containerType !== 'userList' &&(
                <button id="leftCentered" onClick={increaseMovieCount}>Load more movies..</button>
            )}
        </div>
    );
}

export default ScrollingComponent;