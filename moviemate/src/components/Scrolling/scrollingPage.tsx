import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollingComponent.css';

const ScrollingPage = () => {
    const navigate = useNavigate();

    const goToMovie = (number: number) => {
        navigate('/movie', { state: { number } });
    }

    const boxes = Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
        <div key={number} className="box" onClick={() => goToMovie(number)}>
            {`Film ${number}`}
        </div>
    ));
    
    return (
        <div className="scrollingPageContainer">
            <br></br>
            <button onClick={() => {navigate('/')}}>{'< Back'}</button>
            <h1>Her kan du scrolle gjennom filmer</h1>
            <div className="scrollingContainer">
                {boxes}
            </div>
        </div>
    );
}

export default ScrollingPage;
