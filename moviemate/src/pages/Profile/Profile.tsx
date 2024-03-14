import React, { useState, useEffect } from 'react';
import ScrollingComponent from '../../components/Scrolling/ScrollingComponent';
import { User, getUser } from '../../utils/user/users';
import { auth } from '../../config/firebase';
import '../../components/Scrolling/ScrollingComponent.css';
import './Profile.css'
import { NavBar } from '../../components/Navbar/NavBar';
import { Movie, getMovie } from '../../utils/movieUtils/fetchAndFillDb';
import { getFavoriteDirectors, getFavoriteGenres } from '../../utils/favorite/favorite';



const Profile: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [Email, setEmail] = useState<string>('');
    const [userInformation, setUserInformation] = useState<boolean>();
    const [favouriteDirector, setFavouriteDirector] = useState<string>('');
    const [favouriteGenre, setFavouriteGenre] = useState<string>('')
    

    useEffect(() => {
        if (auth.currentUser) {
            getProfileInformation();
        }
    }, []);

    const getProfileInformation = async () => {
        const user = auth.currentUser;
        console.log(user?.uid);
        if (user) {
            await getUser(user.uid).then((user: User) => {
                setFirstName(user.firstname);
                setLastName(user.lastname);
                setEmail(user.email);
            });       
        }
    }

    
    const getUserInformation = () => {
        setUserInformation(!userInformation);
    }


    return (
        <div className="mainPageContainer">
            <div>
                <NavBar/>
                <div className='welcomeText'>
                    <h1>Welcome to your personal page, {firstName}</h1>
                    <div className='userInformation'>
                    <button onClick={getUserInformation}>
                        {userInformation ? 'Hide User Information' : 'Show User Information'}
                        </button>
                        {userInformation && (
                            <>
                                <p>Your Firstname: {firstName}</p>
                                <p>Your Lastname: {lastName}</p>
                                <p>Your Email: {Email}</p>
                            </>
                        )}
                    </div>
                    <h3>{firstName}'s favourite genres:  </h3>
                    <h3>{firstName}'s favourte directors: </h3> 
                    <h3>Your saved movies</h3>
                </div>
                {auth.currentUser ? <ScrollingComponent containerType="userList" uid={auth.currentUser.uid} /> : <p>Cant find user</p>}
            </div>
        </div>
    );
}
export default Profile;