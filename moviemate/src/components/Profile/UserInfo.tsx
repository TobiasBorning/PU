import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { User, getUser } from '../../utils/user/users';
import HoverButton from '../Movie/HoverButton';

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
            await getUser(user.uid).then((user: User) => {
                setFirstName(user.firstname);
                setLastName(user.lastname);
                setEmail(user.email);
                if (user.genres) {
                    setUserGenres(user.genres.map((genres) => {
                        return (
                            <HoverButton text={genres} type="genre"/>
                        );
                    }));
                }
                if (user.directors) {
                    setUserDirectors(user.directors.map((director) => {
                        return (
                            <HoverButton text={director} type="director"/>
                        );
                    }));
                }
            });       
        }
    }

    return (
        <div>
            <p>Your Firstname: {firstName}</p>
            <p>Your Lastname: {lastName}</p>
            <p>Your Email: {Email}</p>
            <p>Your favourite genres:</p>
            {userGenres}
            <p>Your favourite directors:</p>
            {userDirectors}
        </div>
    );
};

export default UserInfo;