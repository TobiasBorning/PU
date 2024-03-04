import React, {useState} from "react";
import { FaStar } from "react-icons/fa";
import { auth } from "../../../config/firebase";
import { User, getUser } from "../../../utils/login/users";
import { collection, getDocs, query, where, setDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export interface Ræting {
    uid?: string;
    movieId?: string;
    rating?: number;
    comment?: string;
}

export const Comment: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(event.target.value);
  };

  const handleSubmit = () => {
      console.log('Rating:', rating )
      console.log('Comment:', comment)
  };

  const getName = async () => {
      const user = auth.currentUser;
      if (user) {
          await getUser(user.uid).then((user: User) => {
              getUser(',' + user.firstname)
          });
      };
    }

    return (
        <div>
            <h2>Give ræting </h2>
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
      <h2>Input Cæmment</h2>
    <div>
      <label htmlFor="comment">Comment:</label>
      <textarea id="comment" value={comment} onChange={handleCommentChange} />
    </div>
    <button onClick={handleSubmit}>Submit</button>
    </div>
    
  );
};


