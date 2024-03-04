import React, { useState } from "react";
import { Auth } from "firebase/auth";
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { auth } from "../../../config/firebase";
import { User, getUser, } from '../../../utils/login/users';
import Rating from "../Rating";
interface Comment {
    uid?: string;
    movieId?: string;
    rating?: number;
    comment?: string;
}
const CommentInput: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Rating:', rating);
    console.log('Comment:', comment);
  };

  const getName = async () => {
    const user = auth.currentUser;
    if (user) {
        await getUser(user.uid).then((user: User) => {
            getUser(', ' + user.firstname);
        });       
    };

  return (
    <div>
      <h2>Input Comment</h2>
      <div>
        <label htmlFor="rating">Rating:</label>
        <Rating />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea id="comment" value={comment} onChange={handleCommentChange} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
return (
  <div>
    <h2>Input Comment</h2>
    <div>
      <label htmlFor="rating">Rating:</label>
        <Rating />
    </div>
    <div>
      <label htmlFor="comment">Comment:</label>
      <textarea id="comment" value={comment} onChange={handleCommentChange} />
    </div>
    <button onClick={handleSubmit}>Submit</button>
  </div>
);
};

export default CommentInput;
