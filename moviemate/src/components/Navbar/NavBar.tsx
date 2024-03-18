import React, { useState } from "react";
import './NavBar.css';
import { useNavigate, useLocation } from "react-router-dom";

export const NavBar: React.FC = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const toggleSearch = () => {
        setIsSearchActive(current => !current);
    }
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string): boolean => {
        return location.pathname === path;
    };
    

    return (
        <nav className="nav">
            <p className={`site-title ${isActive('/main') ? 'active' : ''}`} onClick={() => navigate("/main")}>MovieMate</p>
            <ul>
                <p className={`navBarElements ${isActive('/profile') ? 'active' : ''}`} onClick={() => navigate("/profile")}>My profile</p>
                <p className={`navBarElements ${isActive('/search') ? 'active' : ''}`} onClick={() => navigate("/search")}>Advanced search</p>
            </ul>
        </nav>
    );
}
