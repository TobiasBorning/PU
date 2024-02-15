import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollingComponent.css';

interface Movie {
    id?: number;
    title?: string;
    year?: string;
    runtime?: string;
    actors?: string[];
    generes?: string[];
    posterUrl?: string;
    director?: string;
    plot?: string;
}


const testMovie: Movie = {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
    runtime: "92",
    generes: ["Comedy", "Fantasy"],
    actors: ["Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page"],
    director: "Tim Burton",
    posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg",
    plot: "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house."
}


function ScrollingComponent() {
    const navigate = useNavigate();

    const goToMovie = (number: number) => {
        navigate('/movie', { state: { number } });
    }

    const boxes = Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
        <div key={number} className="box" onClick={() => goToMovie(number)}>
            <h3>{`${testMovie.title}`}</h3>
            <img src={testMovie.posterUrl}/>
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
