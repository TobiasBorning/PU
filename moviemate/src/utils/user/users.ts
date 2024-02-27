import { db } from '../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Movie, getMovie } from '../movieUtils/fetchAndFillDb';

export interface User {
    uid: string;
    email: string;
    firstname: string;
    lastname: string;
}

export function getUser(uid: string): Promise<User> {
    const userDocRef = doc(db, "users", uid);
    const userData = getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
            return doc.data() as User;
        } else {
            throw new Error("No such document!");
        }
    });
    return userData;
}

export const addMovieToUser = (uid: string, movieId: string) => {
    const userDocRef = doc(db, "users", uid);
    getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
            const user = doc.data();
            if (!user?.movies) {
                user.movies = [] as string[];
            }
            if (user) {
                const movies = user.movies;
                movies.push(movieId);
                setDoc(userDocRef, { movies }, { merge: true });
            }
        } else {
            throw new Error("No such document!");
        }
    });
}

export const removeMovieFromUser = (uid: string, movieId: string) => {
    const userDocRef = doc(db, "users", uid);
    getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
            const user = doc.data();
            if (!user?.movies) {
                user.movies = [] as string[];
            }
            if (user) {
                const movies = user.movies;
                const index = movies.indexOf(movieId);
                if (index > -1) {
                    movies.splice(index, 1);
                }
                setDoc(userDocRef, { movies }, { merge: true });
            }
        } else {
            throw new Error("No such document!");
        }
    });
}

export const getUserMovies = (uid: string): Movie[] => {
    const userDocRef = doc(db, "users", uid);
    const movieIds = getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
            const user = doc.data();
            if (user?.movies) {
                return user.movies;
            } else {
                return [] as string[];
            }
        } else {
            throw new Error("No such document!");
        }
    });

    const movieList: Movie[] = []
    for (const movieId in movieIds) {
        getMovie(movieId).then((movie) => {
            movieList.push(movie);
        });
    }
    return movieList;
}
