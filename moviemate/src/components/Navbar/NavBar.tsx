import React from "react";
import './NavBar.css';

export const NavBar: React.FC = () => {
    return (
        <nav className="nav">
        <a className="site-title" href="/ScrollingPage">MovieMate</a>
        <ul>
            <a>My movies</a>
            <a>Filter</a>
            <a>Search</a>
        </ul>
        </nav>
    );
}