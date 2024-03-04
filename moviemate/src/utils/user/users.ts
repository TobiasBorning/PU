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
                const movies: string[] = user.movies;
                if (!movies.includes(movieId)) {
                    movies.push(movieId);
                    setDoc(userDocRef, { movies }, { merge: true });
                }
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

export const getUserMovies = async (uid: string): Promise<Movie[]> => {
    try {
        const userDocRef = doc(db, "users", uid);
        const movieIds: string[] = (await getDoc(userDocRef)).data()?.movies || [];
        const loadedMovies: (Movie| null)[] = await Promise.all(
            movieIds.map(async (movieId) => {
                try {
                    const movie = await getMovie(movieId);
                    return movie;
                } catch {
                    return null;
                }
            })
        );
        const userMovies = loadedMovies.filter((movie) => movie !== null) as Movie[];
        return userMovies;
    } catch (error) {
        throw error;
    }
};

export const isInMyMovies = (uid: string, movieId: string) => {
    const userDocRef = doc(db, "users", uid);
    const containsMovie = getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
            const userMovies = doc.data()?.movies;
            if (!userMovies) {
                return false;
            }
            if (userMovies.includes(movieId)) {
                return true;
            }
            else {
                return false;
            }
        } else {
            throw new Error("No such document!");
        }
    });
    return containsMovie;
}
