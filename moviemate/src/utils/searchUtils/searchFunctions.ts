import { title } from "process";
import { Interface } from "readline";
import { db } from "../../config/firebase";
import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";
import Movie from "../../pages/Movie/Movie";
import { get } from "http";
// these functions return lists of movies or users sorted by spesific parameters. F.eks get movies with genre 

// interface matching movie field in database.
export interface Movie{
    // string of movie ID in database, this is unique to the movie. Functions searching by this should return a Movie interface
    id: string ;
    // Movie title, there may be duplicates. Functions searching by this should return a list
    title: string;
    // list of movie genres. Searches by this should return a list
    genres: [];
    // List of actors in the movie. Searches by actor should return an array.
    actors: [];
    // List of movie directors. Searches by directors shoul return an array.
    director: [];

    // Plot and posterURL is not used in searches, but shoul be required for return values as they are needed for app functionality.
    posterUrl?: String;
    plot?: String;
}

// general search functions, all return arrays of movie Structs
async function getMovieByGenreAnd(genreArray: string[]){
    // todo: error handeling
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = query(collection(db, 'movies'), where('genres', 'array-contains', genreArray));
    
    const document = await getDocs(q);
    document.docs.forEach((doc) => {
        const movie: Movie = {actors: doc.data().actors, id: doc.id, title: doc.data().title, genres: doc.data().genres, director: doc.data().directors, posterUrl: doc.data().posterUrl};
        returnArray.push(movie);
        
    });
    return returnArray;
}
export async function getMovieByGenreOr(genreArray: string[]){
    // todo: error handeling
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = query(collection(db, 'movies'), where('genres', 'array-contains-any', genreArray));
    
    const document = await getDocs(q);
    document.docs.forEach((doc) => {
        const movie: Movie = {actors: doc.data().actors, id: doc.id, title: doc.data().title, genres: doc.data().genres, director: doc.data().directors, posterUrl: doc.data().posterUrl};
        returnArray.push(movie);
    });
    return returnArray;
}
export async function getMovieByLengthLess(length: number){
    //todo: search movie by length in minutes?
    // todo: add movielength to db 
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = query(collection(db, 'movies'), where('length', '<=', length));
    
    const document = await getDocs(q);
    document.docs.forEach((doc) => {
        const movie: Movie = {actors: doc.data().actors, id: doc.id, title: doc.data().title, genres: doc.data().genres, director: doc.data().directors, posterUrl: doc.data().posterUrl};
        returnArray.push(movie);
        
    });
    return returnArray;
}
export async function getMovieByLengthGreat(length: number){
    //todo: search movie by length in minutes?
    // todo: add movielength to db 
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = query(collection(db, 'movies'), where('length', '>=', length));
    
    const document = await getDocs(q);
    document.docs.forEach((doc) => {
        const movie: Movie = {actors: doc.data().actors, id: doc.id, title: doc.data().title, genres: doc.data().genres, director: doc.data().directors, posterUrl: doc.data().posterUrl};
        returnArray.push(movie);
        
    });
    return returnArray;
}
export async function getMovieByDirectorStrict(directorArray: [String]){
    // todo: gets all movies made by these directors by logical and
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = query(collection(db, 'movies'), where('directors', 'array-contains', directorArray));
    
    const document = await getDocs(q);
    document.docs.forEach((doc) => {
        const movie: Movie = {actors: doc.data().actors, id: doc.id, title: doc.data().title, genres: doc.data().genres, director: doc.data().directors, posterUrl: doc.data().posterUrl};
        returnArray.push(movie);
        
    });
    return returnArray;
}
export async function getMovieByDirectorSoft(directorArray: [String]){
    // todo: gets all movies made by these directors by logical or
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = query(collection(db, 'movies'), where('genres', 'array-contains-any', directorArray));
    
    const document = await getDocs(q);
    document.docs.forEach((doc) => {
        const movie: Movie = {actors: doc.data().actors, id: doc.id, title: doc.data().title, genres: doc.data().genres, director: doc.data().directors, posterUrl: doc.data().posterUrl};
        returnArray.push(movie);
        
    });
    return returnArray;
}
// functions sorting arrays of movie interfaces and returning the sorted array. Taking in an array as every non backend function retuns an array
export function sortAlphabetical(movieArray: [Movie], reverse: boolean){
    // takes in an array of Movie interfaces and returns the array sorted by name alphabetically, or alphabetically in reverse depending on boolean
    if(reverse){
        return movieArray.sort((a, b) => a.title.localeCompare(b.title)).reverse()

    }
    return movieArray.sort((a, b) => a.title.localeCompare(b.title))

    
}

// deperciated until average rating is stored in movie entity in database.
// function compareRating(a: Movie , b: Movie ){
//     return a.rating - b.rating
// }
// function sortByScore(movieArray: [Movie], reverse: boolean){
//     // todo: add score attribute to all movies
//     // todo: sort by score attribute
//     return movieArray.sort(compareRating)
    
// }
export async function getMovieByName(name: string){
    // TODO: need to find some way to get the movies by name, may be a dumb solution.
    // ffs firebase supports querying the first and last words of a string. The solution is don't use firebase. 
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = collection(db, 'movies');
    const documents = await getDocs(q);
    documents.docs.forEach((doc) => {
        if(doc.data().title.match(new RegExp(name))){
        const movie: Movie = {actors: doc.data().actors, id: doc.id, title: doc.data().title, genres: doc.data().genres, director: doc.data().directors};
        returnArray.push(movie);
        }                                                 
    });
    return returnArray;
}