import { collection, getDocs, query, where } from "firebase/firestore";
import { Movie } from "../common/interfaces";
import { getUser } from "./users";
import { db } from "../../config/firebase";

export const simpleRecomendation = async (uid : string): Promise<Movie> => {
    const user = await getUser(uid)
    if (user.favoriteDirectors && user.favoriteGenres) {
        const randomInt = Math.floor(Math.random() * 2);
        if (randomInt === 0) {
            const randomDirectorIndex = Math.floor(Math.random() * user.favoriteDirectors.length);
            const randomDirector = user.favoriteDirectors[randomDirectorIndex];
            return await getMovieRandomDirector(randomDirector);
        }
        else {
            const randomGenreIndex = Math.floor(Math.random() * user.favoriteGenres.length);
            const randomGenre = user.favoriteGenres[randomGenreIndex];
            return await getMovieRandomGenre(randomGenre);
        }
    }
    if (user.favoriteDirectors) {
        const randomDirectorIndex = Math.floor(Math.random() * user.favoriteDirectors.length);
        const randomDirector = user.favoriteDirectors[randomDirectorIndex];
        return await getMovieRandomDirector(randomDirector);
    }
    if (user.favoriteGenres) {
        const randomGenreIndex = Math.floor(Math.random() * user.favoriteGenres.length);
        const randomGenre = user.favoriteGenres[randomGenreIndex];
        return await getMovieRandomGenre(randomGenre);
    }
    return await getRandomMovie();
}

const getMovieRandomDirector = async (director: string): Promise<Movie> => {
    const movies: Movie[] = [];
    const q = query(collection(db, 'movies'), where('director', '==', director));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        movies.push(doc.data() as Movie);
    });
    const randomInt = Math.floor(Math.random() * movies.length);
    return movies[randomInt];
}

const getMovieRandomGenre = async (genre: string): Promise<Movie> => {
    const movies: Movie[] = [];
    const q = query(collection(db, 'movies'), where('genres', 'array-contains', genre));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        movies.push(doc.data() as Movie);
    });
    const randomInt = Math.floor(Math.random() * movies.length);
    return movies[randomInt];
}

const getRandomMovie = async (): Promise<Movie> => {
    const movies: Movie[] = [];
    const q = query(collection(db, 'movies'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        movies.push(doc.data() as Movie);
    });
    const randomInt = Math.floor(Math.random() * 99);
    return movies[randomInt];
}