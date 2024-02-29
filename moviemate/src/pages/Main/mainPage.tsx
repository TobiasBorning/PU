import ScrollingComponent from "../../components/Scrolling/ScrollingComponent";
import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { User, getUser } from '../../utils/user/users';
import './mainPage.css';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>('');
    const navigate = useNavigate();


    const getName = async () => {
        console.log('Getting name');
        const user = auth.currentUser;
        if (user) {
            await getUser(user.uid).then((user: User) => {
                setUserName(', ' + user.firstname);
            });       
        }
    }

    useEffect(() => {
        console.log(userName);
        setIsLoading(false);
    }, [userName]);
    
    useEffect(() => {
        if (auth.currentUser) {
            getName();
        }
    });

    return (
        <div className="mainPageContainer">
            {isLoading ? <h1 className="welcomeText">Loading...</h1> : 
            <div>
                <button onClick={() => navigate('/profile')}>Go To Profile</button>
                <div className='welcomeText'>
                    <h1>Hey{userName}</h1>
                    <p>Welcome to Moviemate</p>
                </div>
                <br />
                <ScrollingComponent containerType="default"/>
            </div>
            }
        </div>
    );
}

export default MainPage;