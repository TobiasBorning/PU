import React, { useState } from 'react';
import Aksel_Hennie from '../profiles/photos/Aksel_Hennie.png';
import ClockerOranger from '../profiles/photos/ClockerOranger.jpg';
import Joker from '../profiles/photos/Joker.png';
import Pål_Sverre_Hagen from '../profiles/photos/Pål_Sverre_Hagen.jpg';

const photos = [
    Aksel_Hennie,
    ClockerOranger,
    Joker,
    Pål_Sverre_Hagen,
];

const Random_Profile_Icon: React.FC = () => {

  const getRandomImage = (): string => {
    const randomIndex = Math.floor(Math.random() * photos.length);
    return photos[randomIndex];
  };

 
  const randomImage = getRandomImage();

  return (
    <div>
        <img src={randomImage} alt="Random" />
    </div>
  );
};

export default Random_Profile_Icon;