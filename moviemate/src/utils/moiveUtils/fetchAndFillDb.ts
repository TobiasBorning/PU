import { db } from '../../config/firebase';
import { addDoc, collection, doc, setDoc, getDoc } from 'firebase/firestore';

interface Movie {
    id: string;
    title: string;
    year: number;
    actors: string[];
    generes: string[];
    posterUrl: string;
    director: string;
}

const fillDbWithMovies = async (movies: Movie[]) => {
    const collectionRef = collection(db, 'movies');
    movies.forEach(async (movie) => {
        const data = {
            title: movie.title,
            year: movie.year,
            actors: movie.actors,
            generes: movie.generes,
            posterUrl: movie.posterUrl,
            director: movie.director
        }
        await addDoc(collectionRef, data);
    });
}

export const getMovie = async (id: string) : Promise<Movie> =>  {
    const docRef = doc(db, 'movies', id);
    return await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            const data = doc.data();
            const movie: Movie = {
                id: doc.id,
                title: data.title,
                year: data.year,
                actors: data.actors,
                generes: data.generes,
                posterUrl: data.posterUrl,
                director: data.director
            }
            return movie;
        } else {
            throw new Error('No such document!');
        }
    });
}