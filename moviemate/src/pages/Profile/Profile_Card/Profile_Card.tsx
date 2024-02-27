import React from 'react';
import { useState, useEffect } from 'react';
import './Profile_Card.css';
import { User, getUser } from '../../../utils/login/users'
import { auth } from '../../../config/firebase';
import Random_Profile_Icon from '../assets/profiles/Random_Profile_Icon';


function Profile_Card () {
    const [user, setUser] = useState<string>('');
    const getName = async () => {
        const user = auth.currentUser;
        if (user) {
            await getUser(user.uid).then((user: User) => {
                setUser(', ' + user.firstname + user.lastname);
            });       
        }
    }
    return (
        <div className='PC'>
            <div className="Gradiant"></div>
            <div className="Profile-down">
                < Random_Profile_Icon />
            </div>
            
        </div>
    );
};

export default Profile_Card;