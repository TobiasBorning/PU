import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollingComponent.css';
import { getMovies, Movie } from '../../utils/movieUtils/fetchAndFillDb';
//import { NavBar } from '../Navbar/NavBar';
import { User, getUser } from '../../utils/login/users';
import { auth } from '../../config/firebase';

function ScrollingComponent() {
    const [user, setUser] = useState<string>('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
        getName();
    },[movieList]);

    //laster inn siden når både bruker og movielist er fylt
    useEffect(() => {
        if (movieList.length > 0 && user) {
            setIsLoading(false);
        }
    }, [movieList, user]);

    const getName = async () => {
        if (isLoading) {
            const user = auth.currentUser;
            if (user) {
                await getUser(user.uid).then((user: User) => {
                    setUser(', ' + user.firstname);
                });       
            }
        }
        
    }

    // navigerer til en filmside
    const goToMovie = (number: number) => {
        navigate('/movie', { state: { number } });
    }
    
    // fyller container med filmer
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
        <div className='mainPageContainer'>
            {isLoading ? <h1 className='welcomeText'>Loading...</h1>
            :
            <div>
                <br />
                <div className='welcomeText'>
                    <h1>Hey{user}</h1>
                    <p>Welcome to Moviemate</p>
                </div>
                <br />
                <div className="scrollingContainer">
                    {boxArray}
                    <button onClick={increaseMovieCount}>Load more movies..</button>
                </div>
            </div>
            }
        </div>
    );
}

export default ScrollingComponent;
