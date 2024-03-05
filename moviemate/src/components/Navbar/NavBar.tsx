import React, { useState } from "react";
import './NavBar.css';
import { useNavigate } from "react-router-dom";

export const NavBar: React.FC = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const toggleSearch = () => {
        setIsSearchActive(current => !current);
    }
    const navigate = useNavigate();

    return (
        <nav className="nav">
            <p className="site-title" onClick={ () => navigate("/main") } >MovieMate</p>
            <ul>
                <p className="navBarElements" onClick={ () => {navigate("/profile")}}>My profile</p>
                <p className="navBarElements">Filter</p>
                {isSearchActive ? (
                    <input
                        type="text"
                        className="searchInput active"
                        placeholder="Search movies..."
                        onBlur={toggleSearch}
                    />
                ) : (
                    <p className="navBarElements" onClick={toggleSearch}>
                        Search
                    </p>
                )}
            </ul>
        </nav>
    );
}