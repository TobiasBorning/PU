import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Movie.css';

const Movie = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const number = location.state?.number;

    return (
        <div className='moviecontainer'>
            <button onClick={() => {navigate('/main')}}>{'< Back'}</button>
            <p>Her skal det stå info om Film {number}</p>
        </div>
    );
}

export default Movie;