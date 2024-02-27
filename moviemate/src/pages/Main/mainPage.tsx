import ScrollingComponent from "../../components/Scrolling/ScrollingComponent";
import { useNavigate } from "react-router";
import Profile from "../Profile/Profile";
import React from 'react';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            
            <button onClick={() => navigate('/profile')}>
          Profile
            </button>
        
            <ScrollingComponent />
        </div>
    );
}

export default MainPage;