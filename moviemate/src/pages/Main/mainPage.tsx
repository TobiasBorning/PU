import ScrollingComponent from "../../components/Scrolling/ScrollingComponent";
import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { User, getUser } from '../../utils/user/users';
import './mainPage.css';
import { NavBar } from "../../components/Navbar/NavBar";
import { useNavigate } from 'react-router-dom';
import Carousel from "../../components/Carousel/Carousel";
import { getFavoriteGenres } from "../../utils/favorite/favorite";
import { simpleRecomendation } from "../../utils/user/recomendation";

const MainPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>('');
    const [showRecommendations, setShowRecommendations] = useState<boolean>(false);
    const navigate = useNavigate();

    const getName = async () => {
        console.log('Getting name');
        const user = auth.currentUser;
        if (user) {
            await getUser(user.uid).then((user: User) => {
                setUserName(', ' + user.firstname);
            });
        }
    }

    useEffect(() => {
        console.log(userName);
        getName();
        setIsLoading(false);
    }, [userName]);


    const handleGetRecommendationClick = () => {
        setShowRecommendations(!showRecommendations);
    };

    return (
        <div className="mainPageContainer">
            {isLoading ? <h1 className="welcomeText">Loading...</h1> :
                <div>
                    <NavBar />
                    <div className='welcomeText'>
                        <h1>Hey{userName}</h1>
                        <p>Welcome to Moviemate</p>
                    </div>
                    <button id="leftCentered" onClick={handleGetRecommendationClick}>
                        {showRecommendations ? 'Hide Recommendation' : 'Get Recommendation'}
                    </button>
                    {showRecommendations && (
                        <>
                            <h3>Recommended for you</h3>
                            {auth.currentUser ?
                            <ScrollingComponent containerType="randomFavoriteGenre" uid={auth.currentUser.uid}/>
                            :
                            <p>Not logged in</p>
                            }
                        </>
                    )}
                    <h2>Comedy</h2>
                    <Carousel movieLimit={10} genre="Comedy" />
                    <h2>Action</h2>
                    <Carousel movieLimit={10} genre="Action" />
                    <h2>Family</h2>
                    <Carousel movieLimit={10} genre="Family" />
                    <h2>Drama</h2>
                    <Carousel movieLimit={10} genre="Drama" />
                    <h2>Romance</h2>
                    <Carousel movieLimit={10} genre="Romance" />
                </div>
            }
        </div>
    );
}

export default MainPage;