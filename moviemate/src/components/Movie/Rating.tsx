import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null); // Explicitly define type as number or null
  const [hover, setHover] = useState<number | null>(null); // Explicitly define type as number or null

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover ?? rating ?? 0) ? "#ffc107" : "#e4e5e9"} // Use 0 as fallback value
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <p>You rated: {rating}</p>
    </div>
  );
};

export default Rating;