import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollingComponent.css';
import { getMovies, Movie } from '../../utils/movieUtils/fetchAndFillDb';
import { getUserMovies } from '../../utils/user/users';


type Props = { 
   containerType: string;
   uid?: string;
}

const ScrollingComponent: React.FC<Props> = (props) =>{
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [boxArray,setBoxArray] = useState<JSX.Element[]>([]);
    const [movieCount, setMovieCount] = useState<number>(20);


    // henter filmer fra databasen
    useEffect(() => {
        chooseFill();
    }, [movieCount]);

    // fyller container med filmer når filmene er hentet
    useEffect(() => {
        fillContainer();
    },[movieList]);

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
        if (movieList.length === 0) {
            console.log(getMovies(movieCount));
            getMovies(movieCount).then((movies) => {
                console.log(movies);
                setMovieList(movies);
                fillContainer();
            });
        }
    }

    const fillWithUsersMovies = async () => {
        if (props.uid) {
            console.log(getUserMovies(props.uid));
            getUserMovies(props.uid).then((movies : Movie[]) => {
                console.log(movies);
                setMovieList(movies);
                fillContainer();
            }).catch((error) => {
                console.error('Error getting user movies:', error);
            });
        }
    }

    const chooseFill = () => {
        if (props.containerType === "default") {
            fillAllMovies();
        }
        if (props.containerType === "userList") {
            fillWithUsersMovies();
        }
    }
    // øker filmer med 20
    // TODO: oppdaterer ikke før 2 klikk
    const increaseMovieCount = () => {
        setMovieCount(movieCount + 20);
        console.log(movieCount);
        fillContainer();
    }

    return (
        <div>
            <div className="scrollingContainer">
                {boxArray}
            </div>
            <br />
            <button id ="load" onClick={increaseMovieCount}>Load more movies..</button>
        </div>
    );
}

export default ScrollingComponent;
