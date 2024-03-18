import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { User, getUser } from '../../utils/user/users';
import HoverButton from '../Movie/HoverButton';
import './UserInfo.css';

interface UserInfoProps {
    // define your props here
    uid: string;
    // add more props as needed
}

const UserInfo: React.FC<UserInfoProps> = ({ uid }) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [Email, setEmail] = useState<string>('');
    const [userDirectors, setUserDirectors] = useState<JSX.Element[]>([]);
    const [userGenres, setUserGenres] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (auth.currentUser) {
            getProfileInformation();
        }
    }, [auth.currentUser]);

    const getProfileInformation = async () => {
        const user = auth.currentUser;
        console.log(user?.uid);
        if (user) {
            getUser(user.uid).then((user: User) => {
                setFirstName(user.firstname);
                setLastName(user.lastname);
                setEmail(user.email);
                console.log(user.favoriteGenres);
                console.log(user.favoriteDirectors);
                if (user.favoriteGenres && user.favoriteGenres.length > 0) {
                    setUserGenres(user.favoriteGenres.map((favoriteGenres) => {
                        return (
                            <HoverButton text={favoriteGenres} type="genre"/>
                        );
                    }));
                }
                else {
                    setUserGenres([<button className='noInfoButton'>You have not marked any genres as favorite</button>]);
                }
                if (user.favoriteDirectors && user.favoriteDirectors.length > 0) {
                    setUserDirectors(user.favoriteDirectors.map((director) => {
                        return (
                            <HoverButton text={director} type="director"/>
                        );
                    }));
                }
                else {
                    setUserDirectors([<button className='noInfoButton'>You have not marked any directors as favorite</button>]);
                }
            });       
        }
        
    }

    return (
        <div>
            <p>Hello, {firstName} {lastName}</p>
            <p>Email: {Email}</p>
            <div className='genresAndDirectorsContainer'>
                <p>Your favourite genres:</p>
                {userGenres}
                <p>Your favourite directors:</p>
                {userDirectors}
            </div>
            
        </div>
    );
};

export default UserInfo;