import { db } from '../../config/firebase';
import { collection, query, limit, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';
import data from './db.json';

export interface Movie {
    id?: string;
    title?: string;
    year?: number;
    actors?: string[];
    genres?: string[];
    posterUrl?: string;
    trailerUrl?: string; // adding the Trailer field to the Movie interface
    director?: string[];
    plot?: string;
}

export const testFetchJson = () => {
    console.log(data.movies);
}

export const convertToMovies = () => {
    const movies: Movie[] = [];
    data.movies.forEach((movie: any) => {
        const newMovie: Movie = {
            id: parseId(movie.id),
            title: movie.title,
            year: parseYear(movie.year),
            actors: parseActors(movie.actors),
            genres: parseGenres(movie.genres),
            posterUrl: movie.posterUrl,
            trailerUrl: movie.trailerUrl,
            director: parseDirector(movie.director),
            plot: movie.plot
        }
        console.log(newMovie);
        movies.push(newMovie);
    });
    //fillDbWithMovies(movies);
    console.log(movies);
}

const parseActors = (actors: string): string[] => {
    return actors.split(', ');
}
const parseDirector = (director: string): string[] => {
    return director.split(', ');
}
const parseGenres = (genres: any) => {
    const output: string[] = []
    genres.forEach((genre: string) => {
        output.push(genre);
    });
    return output;
}

const parseYear = (year: string): number => {
    return parseInt(year);
}
const parseId = (id: number): string => {
    return id.toString();

    
  };

export const fillDbWithMovies = async (movies: Movie[]) => {
    movies.forEach(async (movie) => {
        if (movie.id != null) {
            try {
                const movieDoc = doc(db, 'movies', movie.id)
                await setDoc(movieDoc, {
                    title: movie.title,
                    year: movie.year,
                    actors: movie.actors,
                    genres: movie.genres,
                    posterUrl: movie.posterUrl,
                    trailerUrl: movie.trailerUrl,
                    director: movie.director,
                    plot: movie.plot
                });
            }
            catch (e) {
                console.error('Error adding document: ', e);
            }
        }
    });
}

export const getMovie = async (id: string): Promise<Movie> => {
    const docRef = doc(db, 'movies', id);
    return await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
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
            return movie;
        } else {
            throw new Error('No such document!');
        }
    });
}

export const getMovies = async (movieCount: number): Promise<Movie[]> => {
    const movies: Movie[] = [];
    const q = query(collection(db, 'movies'), limit(movieCount));
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
    return movies;
}
