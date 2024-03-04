import React, {useState, useEffect, useId} from "react";
import { FaStar } from "react-icons/fa";
import { auth } from "../../../config/firebase";
import { User, getUser } from "../../../utils/login/users";
import { collection, getDocs, query, where, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { getMovie, Movie } from "../../../utils/movieUtils/fetchAndFillDb";
import ShowMovie from "../ShowMovie";
import { useNavigate } from "react-router-dom";
export interface Ræting {
    userId?: string;
    movieId?: string;
    rating?: number;
    comment?: string;
}

export const getMovieReview = async (userId: string, movieId: string) : Promise<Ræting> => {
  const q = query(collection(db, 'movieRæting'),where('uid','==',userId),where('movieId','==',movieId));
  const querySnapshot = await getDocs(q);
  let reviewOut: Ræting = {rating: 0, comment: ""};
  querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(data);
      reviewOut.comment = data.comment;
      reviewOut.rating = data.rating;
      reviewOut.userId = data.userId;
      reviewOut.movieId = data.movieId;
  });
  return reviewOut;
}
export const Comment: React.FC = () => {
    const [rating, setRating] = useState<number | null>(null);
    const [hover, setHover] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const [userId, getUser] = useState<string>('');
    const [movieId, getMovie] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const addRæting = async () => {
      try {
      const movieReviewDoc = doc(db, 'movieRæting', userId + movieId);
        await setDoc(movieReviewDoc, {
            uid: userId,
            movieId: movieId,
            rating: rating,
            comment: comment
          });
          setRating(0);
      setComment('');
    } 
    catch (error) {
      console.error('Error adding comment:', error);
    }

 };
 

    return (
        <div>
            <h2>Give your ræting, <h1>{userId}</h1> </h2>
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
              onChange={addRæting}
            />
          </label>
        );
      })}
      <h2>Input Cæmment</h2>
    <div>
      <label htmlFor="comment">Comment:</label>
      <textarea id="comment" value={comment} onChange={handleCommentChange} />
    </div>
    <button onClick= {addRæting}>Submit</button>
    </div>
    
  );
};