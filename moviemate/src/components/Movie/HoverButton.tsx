import React, { useEffect, useState } from 'react';
import './HoverButton.css'; // Import CSS file for styling
import { favoriteDirector, favoriteGenre, isFavoriteDirector, isFavoriteGenre, unfavoriteDirector, unfavoriteGenre } from '../../utils/favorite/favorite';
import { auth } from '../../config/firebase';

type Props = {
    text?: string;
    type?: string;
}

const HoverButton: React.FC<Props> = ({text, type}) =>{
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const user = auth.currentUser

  useEffect(() => {
    checkFavorite();
  },[user]);


  const checkFavorite = async () => {
    if (user && text) {
      if (type === 'genre') {
        const favorite = await isFavoriteGenre(user.uid, text);
        if (favorite !== isFavorite) {
          setIsFavorite(favorite);
        }
      }
      else if (type === 'director'){
        const favorite = await isFavoriteDirector(user.uid, text);
        if (favorite !== isFavorite) {
          setIsFavorite(favorite);
        }
      }
    }
  }

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
    setIsFavorite(!isFavorite);
  }

  const setUnFavorite = () => {
    const user = auth.currentUser
    if (user && text) {
      if (type === 'genre') {
        unfavoriteGenre(user.uid, text)
        console.log('removed favorite genre')
        setIsFavorite(false);
      }
      else if (type === 'director'){
        unfavoriteDirector(user.uid, text)
        console.log('removed favorite director')
        setIsFavorite(false);
      }
    }
    setIsFavorite(!isFavorite);
  }

  return (
    <button
      className="genreOrDirectorButton"
      onMouseEnter={() => setIsHovered(true)}
      onClick={() => (isFavorite ? setUnFavorite() : setFavorite())}
      onMouseLeave={() => setIsHovered(false)}
      style={{backgroundColor: isFavorite ? '#e4b036' : 'white'}}
    >
      {isHovered ? (isFavorite ? 'Unfavorite' : 'Favorite') : text}
    </button>
  );
}

export default HoverButton;