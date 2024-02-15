import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollingComponent.css';
import { auth } from '../../config/firebase';
import { getUser, User } from '../../utils/login/users';

const ScrollingPage = () => {
    const [user, setUser] = useState<string>('');
    const navigate = useNavigate();
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

    const boxes = Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
        <div key={number} className="box" onClick={() => goToMovie(number)}>
            {`Film ${number}`}
        </div>
    ));

    useEffect(() => {
        getName();
    });
    
    return (
        <div className="scrollingPageContainer">
            <br></br>
            <button onClick={() => {navigate('/')}}>{'< Back'}</button>
            <h1>Hey{user}</h1>
            <div className="scrollingContainer">
                {boxes}
            </div>
        </div>
    );
}

export default ScrollingPage;
