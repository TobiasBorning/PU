import ShowMovie from '../../components/Movie/ShowMovie';
import { NavBar } from '../../components/Navbar/NavBar';
import React from 'react';

const Movie: React.FC = () => {
    return (
        <div>
            <NavBar/>
            <ShowMovie />
        </div>
    );
}

export default Movie;