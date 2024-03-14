import React, { useState, useEffect } from 'react';
import ScrollingComponent from '../../components/Scrolling/ScrollingComponent';
import { User, getUser } from '../../utils/user/users';
import { auth } from '../../config/firebase';
import '../../components/Scrolling/ScrollingComponent.css';
import './Profile.css'
import { NavBar } from '../../components/Navbar/NavBar';
import { Movie, getMovie } from '../../utils/movieUtils/fetchAndFillDb';
import { getFavoriteDirectors, getFavoriteGenres } from '../../utils/favorite/favorite';
import GenresAndDirectorsButtons from '../../components/Movie/GenresAndDirectorsButtons';
import UserInfo from '../../components/Profile/UserInfo';



const Profile: React.FC = () => {    
    return (
        <div className="mainPageContainer">
            <div>
                <NavBar/>
                <div className='welcomeText'>
                    <div className='userInformation'>
                        {auth.currentUser ? <UserInfo uid='{}'/> : <p>Cant find user</p>}
                    </div>
                </div>
                {auth.currentUser ? <ScrollingComponent containerType="userList" uid={auth.currentUser.uid} /> : <p>Cant find user</p>}
            </div>
        </div>
    );
}
export default Profile;