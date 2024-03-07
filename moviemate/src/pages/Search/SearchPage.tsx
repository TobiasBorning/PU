import ScrollingComponent from "../../components/Scrolling/ScrollingComponent";
import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { User, getUser } from '../../utils/user/users';
import { NavBar } from "../../components/Navbar/NavBar";
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';


export{}
const SearchPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>('');
    // const [isSearchActive, setIsSearchActive] = useState(false);
    // const toggleSearch = () => {
    //     setIsSearchActive(current => !current);
    // }
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
        setIsLoading(false);
    }, [userName]);

    useEffect(() => {
        if (auth.currentUser) {
            getName();
        }
    });

    return (
                <div className="searchPageContainer">
                    <NavBar />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <input 
                        type="text"
                        className="searchInput"
                        placeholder="Search movies..."
                    />
                    <ScrollingComponent containerType="default" />
                </div>
    );
}

export default SearchPage;