import React, { useState, useEffect } from 'react';
import ScrollingComponent from '../../components/Scrolling/ScrollingComponent';
import { User, getUser } from '../../utils/user/users';
import { auth } from '../../config/firebase';
import '../../components/Scrolling/ScrollingComponent.css';
import './Profile.css'
import { NavBar } from '../../components/Navbar/NavBar';



const Profile: React.FC = () => {
    const [user, setUser] = useState<string>('');

    useEffect(() => {
        if (auth.currentUser) {
            getName();
        }
    }, []);

    const getName = async () => {
        const user = auth.currentUser;
        console.log(user?.uid);
        if (user) {
            await getUser(user.uid).then((user: User) => {
                setUser(', ' + user.firstname);
            });       
        }
    }
    return (
        <div className="mainPageContainer">
            <div>
                <NavBar/>
                <div className='welcomeText'>
                    <h1>Welcome to your personal page{user}</h1>
                    <p>Your saved movies</p>
                </div>
                {auth.currentUser ? <ScrollingComponent containerType="userList" uid={auth.currentUser.uid} /> : <p>Cant find user</p>}
            </div>
        </div>
    );
}
export default Profile;