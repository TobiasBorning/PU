import { collection, getDocs, query, where } from "firebase/firestore";
import { Movie } from "../common/interfaces";
import { getUser } from "./users";
import { db } from "../../config/firebase";

export const simpleRecomendation = async (uid: string): Promise<Movie> => {
    const user = await getUser(uid)
    // If user has both genres and directors
    if (user.favoriteDirectors && user.favoriteGenres && user.favoriteGenres.length > 0 && user.favoriteDirectors.length > 0) {
        console.log("1")
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
    // User has only directors
    if (user.favoriteDirectors && user.favoriteDirectors.length > 0) {
        console.log("2")
        const randomDirectorIndex = Math.floor(Math.random() * user.favoriteDirectors.length);
        const randomDirector = user.favoriteDirectors[randomDirectorIndex];
        return await getMovieRandomDirector(randomDirector);
    }
    // user has only genres
    if (user.favoriteGenres && user.favoriteGenres.length > 0) {
        console.log("3")
        const randomGenreIndex = Math.floor(Math.random() * user.favoriteGenres.length);
        const randomGenre = user.favoriteGenres[randomGenreIndex];
        return await getMovieRandomGenre(randomGenre);
    }
    // user has none of the above
    console.log("4")
    return await getRandomMovie();
}

const getMovieRandomDirector = async (director: string): Promise<Movie> => {
    const movies: Movie[] = [];
    const q = query(collection(db, 'movies'), where('director', '==', director));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const movie: Movie = {
            id: doc.id,
            title: data.title,
            year: data.year,
            actors: data.actors,
            genres: data.genres,
            posterUrl: data.posterUrl,
            trailerUrl: data.trailerUrl,
            director: data.director,
            plot: data.plot
        }
        movies.push(movie);
    });
    const randomInt = Math.floor(Math.random() * movies.length);
    return movies[randomInt];
}

const getMovieRandomGenre = async (genre: string): Promise<Movie> => {
    const movies: Movie[] = [];
    const q = query(collection(db, 'movies'), where('genres', 'array-contains', genre));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const movie: Movie = {
            id: doc.id,
            title: data.title,
            year: data.year,
            actors: data.actors,
            genres: data.genres,
            posterUrl: data.posterUrl,
            trailerUrl: data.trailerUrl,
            director: data.director,
            plot: data.plot
        }
        movies.push(movie);
    });
    const randomInt = Math.floor(Math.random() * movies.length);
    return movies[randomInt];
}

const getRandomMovie = async (): Promise<Movie> => {
    console.log("random movie")
    const movies: Movie[] = [];
    const q = query(collection(db, 'movies'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const movie: Movie = {
            id: doc.id,
            title: data.title,
            year: data.year,
            actors: data.actors,
            genres: data.genres,
            posterUrl: data.posterUrl,
            trailerUrl: data.trailerUrl,
            director: data.director,
            plot: data.plot
        }
        movies.push(movie);
    });
    const randomInt = Math.floor(Math.random() * 99);
    return movies[randomInt];
}