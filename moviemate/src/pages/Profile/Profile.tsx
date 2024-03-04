import React, { useState, useEffect } from 'react';
import Profile_Card from './Profile_Card/Profile_Card';
import ScrollingComponent from '../../components/Scrolling/ScrollingComponent';
import { User, getUser } from '../../utils/user/users';
import { auth } from '../../config/firebase';
import { useNavigate } from "react-router";
import '../../components/Scrolling/ScrollingComponent.css';
import './Profile.css'


const Profile: React.FC = () => {
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
        <button onClick={() => navigate('/main')}>Go To Main</button>
        <h1 className='welcomeText'>Welcome to your personal site{user} </h1>
        <h2 className='welcomeText'>Your Saved Movies: </h2>
        <ScrollingComponent containerType="usersList" uid={auth.currentUser?.uid} />
        </div>
    );
}
export default Profile;