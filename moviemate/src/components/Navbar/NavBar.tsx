import React, { useState } from "react";
import './NavBar.css';

export const NavBar: React.FC = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const toggleSearch = () => {
        setIsSearchActive(current => !current);
    }

    return (
        <nav className="nav">
            <a className="site-title" href="/main">MovieMate</a>
            <ul>
                <a className="navBarElements" href="#">My profile</a>
                <a className="navBarElements" href="#">Filter</a>
                {isSearchActive ? (
                    <input
                        type="text"
                        className="searchInput active"
                        placeholder="Search movies..."
                        onBlur={toggleSearch}
                    />
                ) : (
                    <a className="navBarElements" onClick={toggleSearch}>
                        Search
                    </a>
                )}
            </ul>
        </nav>
    );
}