import ScrollingComponent from "../../components/Scrolling/ScrollingComponent";
import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { User, getUser } from '../../utils/user/users';
import { NavBar } from "../../components/Navbar/NavBar";
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';
import { Movie, getMovieByDirectorSoft, getMovieByName } from "../../utils/searchUtils/searchFunctions";


export{}
const SearchPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>('');
    // const [isSearchActive, setIsSearchActive] = useState(false);
    // const toggleSearch = () => {
    //     setIsSearchActive(current => !current);
    // }
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>('');
    const [movieList, setMovieList] = useState<Movie[]>([]);

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


    useEffect(() => {
        if (searchText !== '') {
            Promise.all([
                getMovieByName(searchText),
                getMovieByDirectorSoft([searchText]) // Pass searchText som et element i en array
            ]).then(([moviesByName, moviesByDirector]) => {
                // Kombiner resultatene fra begge kallene
                const combinedMovies = [...moviesByName, ...moviesByDirector];
                setMovieList(combinedMovies);
            }).catch((error) => {
                console.error('Error searching movies:', error);
            });
        } else {
            // Hvis søketeksten er tom, vis standardliste over filmer
            // Implementer dette avhengig av dine behov
        }
    }, [searchText]);
    

    return (
        <div className="searchPageContainer">
            <NavBar />
            <input 
                type="text"
                className="searchInput"
                placeholder="Search movies..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <ScrollingComponent containerType="default" searchQuery={searchText} /> {/* Send søkestrengen til ScrollingComponent */}
        </div>
    );
}

export default SearchPage;


