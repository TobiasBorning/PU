import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { getMovieReview, reviewMovie } from '../../utils/review/reviewUtils';
import { useLocation } from 'react-router-dom';
import { auth } from '../../config/firebase';
import './ReviewMovie.css';

type Props = { 
  comment?: string;
  rating?: number;
}

const ReviewMovie: React.FC<Props> = () => {
  const location = useLocation();
  const [rating, setRating] = useState<number | null>(null); // Explicitly define type as number or null
  const [hover, setHover] = useState<number | null>(null); // Explicitly define type as number or null
  const [comment, setComment] = useState<string>('');
  const movieId = location.state?.number;
  
  useEffect(() => {
    const fetchReview = async () => {
        if (movieId !== undefined && auth.currentUser) {
            console.log("Fetching review");
            const review = await getMovieReview(auth.currentUser.uid, movieId.toString());
            console.log(review);
            review.rating ? setRating(review.rating) : setRating(0);
            review.comment ? setComment(review.comment) : setComment('');
        }
        else {
            console.error('Movie ID is undefined or user not logged in');
        }
    };
    fetchReview();
},[auth.currentUser,movieId]);

  //Update comment state when user types in the textarea
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  //Add rating and comment to the database
  const addRating = () => {
    if (auth.currentUser && rating != null) {
      console.log(auth.currentUser.uid + "reviewing movie: " + movieId + " with rating: " + rating + " and comment: " + comment);
      reviewMovie(auth.currentUser.uid, movieId.toString(), rating, comment);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

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
      <div>
        <textarea className="commentField" id="comment" value={comment} onChange={handleCommentChange} />
      </div>
      <button onClick= {addRating}>Submit review</button>
    </div>
  );
};

export default ReviewMovie;