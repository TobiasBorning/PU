import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollingComponent.css';
import { getMovie, Movie } from '../../utils/movieUtils/fetchAndFillDb';

function ScrollingComponent() {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState<Movie[]>([]);

    useEffect(() => {
        const fillMovieList = async () => {
            const movies: Movie[] = [];
            for (let i = 1; i < 15; i++) {
                try {
                    const movie = await getMovie(i.toString());
                    movies.push(movie);
                } catch (error) {
                    console.error(`Error fetching movie ${i}:`, error);
                }
            }
            setMovieList(movies);
        };
        
        fillMovieList();
    }, []);

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
            <br></br>
            <h1>Her kan du scrolle gjennom filmer</h1>
            <div className="scrollingContainer">
                {boxes}
            </div>
        </div>
    );
}

export default ScrollingComponent;
