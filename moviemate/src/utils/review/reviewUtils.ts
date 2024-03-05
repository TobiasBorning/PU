import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';


/**
 * Review object
 * contains:
 * - uid: string
 * - movieId: string
 * - rating: number 
 * - comment: string
 */
export interface Review {
    uid?: string;
    movieId?: string;
    rating?: number;
    comment?: string;
}


/**
 * Add a review to a movie
 * 
 * @param userId // The user's ID, use auth.currentUser.uid
 * @param movieId // The movie's ID
 * @param rating  // Rating from 1 to 5
 * @param comment // Comment
 * 
 * @throws Error if rating is not between 1 and 5
 */
export const reviewMovie = async (userId: string, movieId: string, rating: number, comment: string) => {
    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }
    try {
        const movieReviewDoc = doc(db, 'movieReview', userId + movieId); // Unique ID for the review, calling the function again will overwrite the review
        await setDoc(movieReviewDoc, {
            uid: userId,
            movieId: movieId,
            rating: rating,
            comment: comment
        });
        console.log("Successfully added: ", movieReviewDoc.id);
    }
    catch {
        console.error("Error adding document");
    }
}


/**
 * Get a review for a movie
 * 
 * @param userId // The user's ID, use auth.currentUser.uid
 * @param movieId // The movie's ID
 * @returns Review object
 */
export const getMovieReview = async (userId: string, movieId: string) : Promise<Review> => {
    const q = query(collection(db, 'movieReview'),where('uid','==',userId),where('movieId','==',movieId));
    const querySnapshot = await getDocs(q);
    let reviewOut: Review = {rating: 0, comment: ""};
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        reviewOut.comment = data.comment;
        reviewOut.rating = data.rating;
        reviewOut.uid = data.uid;
        reviewOut.movieId = data.movieId;
    });
    return reviewOut;
}