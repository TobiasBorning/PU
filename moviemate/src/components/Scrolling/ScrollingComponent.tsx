import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollingComponent.css';
import { getMovies, Movie } from '../../utils/movieUtils/fetchAndFillDb';
import { NavBar } from '../Navbar/NavBar';
import { User, getUser } from '../../utils/login/users';
import { auth } from '../../config/firebase';

function ScrollingComponent() {
    const [user, setUser] = useState<string>('');
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState<Movie[]>([]);

    useEffect(() => {
        const fillMovieList = async () => {
            getMovies().then((movies) => {
                setMovieList(movies);
            });
        };
        getName();
        fillMovieList();
    }, []);

    const getName = async () => {
        const user = auth.currentUser;
        if (user) {
            await getUser(user.uid).then((user: User) => {
                setUser(', ' + user.firstname);
            });       
        }
    }

    const goToMovie = (number: number) => {
        navigate('/movie', { state: { number } });
    }
    
    const boxes = movieList.map((movie) => (
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
    

    return (
        <div className="scrollingPageContainer">
            <NavBar />
            <br></br>
            <h1>Hey{user}</h1>
            <div className="scrollingContainer">
                {boxes}
            </div>
        </div>
    );
}

export default ScrollingComponent;
