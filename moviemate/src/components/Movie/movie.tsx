import React from 'react';
import { useLocation } from 'react-router-dom';
import './Movie.css';

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

function Movie() {
    const location = useLocation();
    const number = location.state?.number;

    return (
        <div className='moviecontainer'>
            <h1> {testMovie.title}</h1>
            <p> Year: {testMovie.year}<br></br>
                Runtime: {testMovie.runtime}<br></br>
                Genres: {testMovie.generes}<br></br>
                Actors: {testMovie.actors}<br></br>
                Director: {testMovie.director}<br></br>
                Plot: {testMovie.plot}<br></br><br></br><br></br>
                <img src={testMovie.posterUrl}/>
            </p>
        </div>
    );
}

export default Movie;