import React from 'react';
import { useLocation } from 'react-router-dom';
import './Movie.css';

function Movie() {
    const location = useLocation();
    const number = location.state?.number;

    return (
        <div className='moviecontainer'>
            <p>Her skal det stå info om Film {number}</p>
        </div>
    );
}

export default Movie;