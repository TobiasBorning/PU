import React, { useState } from 'react';
import './HoverButton.css'; // Import CSS file for styling

type Props = {
    text?: string;
}

const HoverButton: React.FC<Props> = ({text}) =>{
  const [isHovered, setIsHovered] = useState(false);

  //TODO: Add functionality to add to favourites to database
  //TODO: Add functionality to mark allready favorited directors or genres. Needs util funciton

  return (
    <button
      className="genreOrDirectorButton"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? 'Favourite' : text}
    </button>
  );
}

export default HoverButton;