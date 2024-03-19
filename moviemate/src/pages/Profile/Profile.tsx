import React from 'react';
import ScrollingComponent from '../../components/Scrolling/ScrollingComponent';
import { auth } from '../../config/firebase';
import '../../components/Scrolling/ScrollingComponent.css';
import './Profile.css'
import { NavBar } from '../../components/Navbar/NavBar';
import UserInfo from '../../components/Profile/UserInfo';



const Profile: React.FC = () => {
    return (
        <div className="mainPageContainer">
            <div>
                <NavBar />
                <div className='welcomeText'>
                    <div className='userInformation'>
                        {auth.currentUser ? <UserInfo uid='{}' /> : <p>Cant find user</p>}
                    </div>
                </div>
                <h3>Your movie list:</h3>
                {auth.currentUser ? <ScrollingComponent containerType="userList" uid={auth.currentUser.uid} /> : <p>Cant find user</p>}

            </div>
        </div>
    );
}

export default Profile;