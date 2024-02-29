import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollingComponent.css';
import { getMovies, Movie } from '../../utils/movieUtils/fetchAndFillDb';

type Props = { 
   containerType: string;
}

const ScrollingComponent: React.FC<Props> = (props) =>{
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [boxArray,setBoxArray] = useState<JSX.Element[]>([]);
    const [movieCount, setMovieCount] = useState<number>(20);


    // henter filmer fra databasen
    useEffect(() => {
        const fillMovieList = async () => {
            if (movieList.length === 0) {
                getMovies(movieCount).then((movies) => {
                    setMovieList(movies);
                });
            }
        };
        fillMovieList();
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
    const fillContainerDefault = () => {
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

    
    const fillContainer = () => {
        if (props.containerType === 'default') {
            fillContainerDefault();
        }
    }


    // øker filmer med 20
    // TODO: oppdaterer ikke før 2 klikk
    const increaseMovieCount = () => {
        setMovieCount(movieCount + 20);
        console.log(movieCount);
        getMovies(movieCount).then((movies) => {
            setMovieList(movies);   
        });
        fillContainer();
    }

    return (
        <div>
            <div className="scrollingContainer">
                {boxArray}
                <button onClick={increaseMovieCount}>Load more movies..</button>
            </div>
        </div>
    );
}

export default ScrollingComponent;
