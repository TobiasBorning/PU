import { title } from "process";
import { Interface } from "readline";
import { db } from "../../config/firebase";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
// these functions return lists of movies or users sorted by spesific parameters. F.eks get movies with genre 

// interface matching movie field in database.
interface Movie{
    // string of movie ID in database, this is unique to the movie. Functions searching by this should return a Movie interface
    id: String ;
    // Movie title, there may be duplicates. Functions searching by this should return a list
    title: String;
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
function getMovieByGenreStrict(genreArray: []){
    // todo: query by logical and for all items in genreArray
    
    const q = query(collection(db, 'movies'), where('genres', 'array-contains', genreArray));
    try{
        const document = await getDocs(q);
    }
    catch(error){
        reportError(error);
    }

}
function getMovieByGenreSoft(genreArray: []){
    // todo: query for logical or for all items in genreArray
}
function getMovieByLength(length: number){
    //todo: search movie by length in minutes?
    // todo: add movielength to db 
}
function getMovieByDirectorStrict(directorArray: []){
    // todo: gets all movies made by these directors by logical and
}
function getMovieByDirectorSoft(directorArray: []){
    // todo: gets all movies made by these directors by logical or
}
// functions sorting arrays of movie interfaces and returning the sorted array.
function sortAlphabetical(movieArray: [], reverse: boolean){
    // takes in an array of Movie interfaces and returns the array sorted by name alphabetically, or alphabetically in reverse depending on boolean

}
function sortByScore(movieArray: [], reverse: boolean){
    // todo: add score attribute to all movies
    // todo: sort by score attribute
}
function getMovieByName(name: String){

}