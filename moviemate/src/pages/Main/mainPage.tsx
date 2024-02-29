import ScrollingComponent from "../../components/Scrolling/ScrollingComponent";
import { useNavigate } from "react-router";
import Profile from "../Profile/Profile";
import React, { useState, useEffect } from 'react';
import { User, getUser } from '../../utils/login/users';
import { auth } from '../../config/firebase';
import '../../components/Scrolling/ScrollingComponent.css';



const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<string>('');
    useEffect(() => {
        const fetchData = async () => {
            await getName();
        };
    
        fetchData();
    }, []);
    const getName = async () => {
        const user = auth.currentUser;
        if (user) {
            await getUser(user.uid).then((user: User) => {
                setUser(', ' + user.firstname);
            });       
        }
    }
    return (
        <div>
            <button onClick={() => navigate('/profile')}>
            Profile
            </button>
            <div className='welcomeText'>
                <h1>Hey{user}</h1>
                <p>Welcome to Moviemate</p>
            </div>
            <ScrollingComponent />
        </div>
    );
}

export default MainPage;