import ScrollingComponent from "../../components/Scrolling/ScrollingComponent";

import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { User, getUser } from '../../utils/login/users';

const MainPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>('');


    const getName = async () => {
        const user = auth.currentUser;
        if (user) {
            await getUser(user.uid).then((user: User) => {
                setUserName(', ' + user.firstname);
            });       
        }
    }

    useEffect(() => {
        if (userName === '') {
            getName();
        }
        else {
            setIsLoading(false);
        }
    }, [userName]);
    

    return (
        <div className="mainPageContainer">
            {isLoading ? <h1 className="welcomeText">Loading...</h1> : 
            <div>
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