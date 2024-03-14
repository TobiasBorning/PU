import ScrollingComponent from "../../components/Scrolling/ScrollingComponent";
import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { User, getUser } from '../../utils/user/users';
import { NavBar } from "../../components/Navbar/NavBar";
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';


const SearchPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>('');
    const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
    const [updateTrigger, setUpdateTrigger] = useState<number>(0);
    const navigate = useNavigate();
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const toggleFilters = () => setShowFilters(!showFilters);

    const genres = [
        'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'Romance', 'Thriller'
    ];

    const handleFilterClick = () => {
        if (selectedGenres.size > 0) {
            setIsFiltered(true); 
            setUpdateTrigger(prev => prev + 1);
            setShowFilters(false);
        } else {
            setIsFiltered(false); // Ingen sjangre er valgt, vis alle filmer
            setUpdateTrigger(prev => prev + 1);
            setShowFilters(false);
        }
    };

    const handleGenreChange = (genre: string) => {
        setSelectedGenres((prevSelectedGenres) => {
            const newSelection = new Set(prevSelectedGenres);
            if (newSelection.has(genre)) {
                newSelection.delete(genre);
            } else {
                newSelection.add(genre);
            }
            return newSelection;
        });
    };

    const getName = async () => {
        console.log('Getting name');
        const user = auth.currentUser;
        if (user) {
            await getUser(user.uid).then((user: User) => {
                setUserName(', ' + user.firstname);
            });
        }
    };

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
            <div className="search-and-filter-container">
                <div>
                    <h3>Search Title or Director</h3>
                    <input type="text" className="searchInput" placeholder="Search..." />
                </div>
                <div className="dropdown">
                    <div className="filter-header" onClick={toggleFilters}>
                        Filter Genres ▼
                    </div>
                    {showFilters && (
                        <div className="dropdown-content">
                            <div className="genre-container">
                                <div>
                                    {genres.slice(0, 5).map((genre) => (
                                        <label key={genre} className="genre-label">
                                            <input
                                                type="checkbox"
                                                checked={selectedGenres.has(genre)}
                                                onChange={() => handleGenreChange(genre)}
                                            />
                                            {genre}
                                        </label>
                                    ))}
                                </div>
                                <div>
                                    {genres.slice(5).map((genre) => (
                                        <label key={genre} className="genre-label">
                                            <input
                                                type="checkbox"
                                                checked={selectedGenres.has(genre)}
                                                onChange={() => handleGenreChange(genre)}
                                            />
                                            {genre}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <button id="leftCentered" onClick={() => {
                                handleFilterClick();
                                toggleFilters();
                            }}>Filter</button>
                        </div>
                    )}
                </div>
            </div>
            <ScrollingComponent
                containerType={isFiltered && selectedGenres.size > 0 ? "genre" : "default"}
                selectedGenres={Array.from(selectedGenres)}
                updateTrigger={updateTrigger}
            />
        </div>
    );
};

export default SearchPage;
