import React, { useEffect, useState } from 'react';
import './HoverButton.css'; // Import CSS file for styling
import { favoriteDirector, favoriteGenre, getFavoriteDirectors, getFavoriteGenres } from '../../utils/favorite/favorite';
import { auth } from '../../config/firebase';

type Props = {
    text?: string;
    type?: string;
}

const HoverButton: React.FC<Props> = ({text, type}) =>{
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => 

  );
  //TODO: Add functionality to add to favourites to database
  //TODO: Add functionality to mark allready favorited directors or genres. Needs util funciton
  const setFavorite = () => {
    const user = auth.currentUser
    if (user && text) {
      if (type === 'genre') {
        favoriteGenre(user.uid,text)
        console.log("added favorite genre")
      }
      else if (type === 'director'){
        favoriteDirector(user.uid, text)
        console.log("added favorite director")
      }
    }    
  }

  return (
    <button
      className="genreOrDirectorButton"
      onMouseEnter={() => setIsHovered(true)}
      onClick={() => setFavorite()}
      onMouseLeave={() => setIsHovered(false)}

    >
      {isHovered ? 'Favourite' : text}
    </button>
  );
}

export default HoverButton;