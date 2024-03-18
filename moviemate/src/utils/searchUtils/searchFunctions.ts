import { title } from "process";
import { Interface } from "readline";
import { db } from "../../config/firebase";
import { collection, getDoc, getDocs, query, where, doc, WhereFilterOp, updateDoc, setDoc, Firestore, getAggregateFromServer, sum, average } from "firebase/firestore";
import MovieP from "../../pages/Movie/Movie";
import { get } from "http";
import { idText } from "typescript";
import { Movie } from "../common/interfaces";
import { count } from "console";
// these functions return lists of movies or users sorted by spesific parameters. F.eks get movies with genre 

// general search functions, all return arrays of movie Structs
async function getMovieByGenreAnd(genreArray: string[]) {
    // todo: error handeling
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = query(collection(db, 'movies'), where('genres', 'array-contains', genreArray));

    const document = await getDocs(q);
    document.docs.forEach((doc) => {
        const movie: Movie = {
            actors: doc.data().actors, id: doc.id, title: doc.data().title, genres: doc.data().genres
            , director: doc.data().director, posterUrl: doc.data().posterUrl, trailerUrl: doc.data().trailerUrl, year: doc.data().year
        };
        returnArray.push(movie);

    });
    return returnArray;
}
export async function getMovieByGenreOr(genreArray: string[]) {
    // todo: error handeling
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = query(collection(db, 'movies'), where('genres', 'array-contains-any', genreArray));

    const document = await getDocs(q);
    document.docs.forEach((doc) => {
        const movie: Movie = { actors: doc.data().actors, id: doc.id, title: doc.data().title, genres: doc.data().genres, director: doc.data().director, posterUrl: doc.data().posterUrl, trailerUrl: doc.data().trailerUrl, year: doc.data().year };
        returnArray.push(movie);
    });
    return returnArray;
}
//export async function getMovieByLengthLess(length: number) {
// export async function getMovieByLengthLess(length: number){
//     //todo: search movie by length in minutes?
//     // todo: add movielength to db 
//     var returnArray: Array<Movie>;
//     returnArray = [];
//     const q = query(collection(db, 'movies'), where('length', '<=', length));

//     const document = await getDocs(q);
//     document.docs.forEach((doc) => {
//         const movie: Movie = {actors: doc.data().actors, id: doc.data().id, title: doc.data().title, genres: doc.data().genres, director: doc.data().directors};
//         returnArray.push(movie);

//     });
//     return returnArray;
// }
// export async function getMovieByLengthGreat(length: number){
//     //todo: search movie by length in minutes?
//     // todo: add movielength to db 
//     var returnArray: Array<Movie>;
//     returnArray = [];
//     const q = query(collection(db, 'movies'), where('length', '>=', length));

//     const document = await getDocs(q);
//     document.docs.forEach((doc) => {
//         const movie: Movie = {actors: doc.data().actors, id: doc.data().id, title: doc.data().title, genres: doc.data().genres, director: doc.data().directors};
//         returnArray.push(movie);

//     });
//     return returnArray;
// }
export async function getByLength(length: number, operator: string) {
    //todo: search movie by length in minutes?
    // todo: add movielength to db 
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = query(collection(db, 'movies'), where('length', operator as WhereFilterOp, length));
    const document = await getDocs(q);
    document.docs.forEach((doc) => {
        const movie: Movie = { actors: doc.data().actors, id: doc.id, title: doc.data().title, genres: doc.data().genres, director: doc.data().director, posterUrl: doc.data().posterUrl, trailerUrl: doc.data().trailerUrl, year: doc.data().year };
        returnArray.push(movie);

    });
    return returnArray;
}
export async function getMovieByLengthGreat(length: number) {
    //todo: search movie by length in minutes?
    // todo: add movielength to db 
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = query(collection(db, 'movies'), where('length', '>=', length));

    const document = await getDocs(q);
    document.docs.forEach((doc) => {
        const movie: Movie = { actors: doc.data().actors, id: doc.id, title: doc.data().title, genres: doc.data().genres, director: doc.data().director, posterUrl: doc.data().posterUrl, trailerUrl: doc.data().trailerUrl, year: doc.data().year };
        returnArray.push(movie);

    });
    return returnArray;
}
export async function getMovieByDirectorStrict(directorArray: [String]) {
    // todo: gets all movies made by these directors by logical and
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = query(collection(db, 'movies'), where('director', 'array-contains', directorArray));

    const document = await getDocs(q);
    document.docs.forEach((doc) => {
        const movie: Movie = {
            actors: doc.data().actors, id: doc.id, title: doc.data().title, genres: doc.data().genres, director: doc.data().director, posterUrl: doc.data().posterUrl,
            trailerUrl: doc.data().trailerUrl, year: doc.data().year
        };
        returnArray.push(movie);

    });
    return returnArray;
}

export async function getMovieByDirectorSoft(directorArray: string[]) {
    // todo: gets all movies made by these directors by logical or
    var returnArray: Array<Movie>;
    returnArray = [];
    const q = collection(db, 'movies');

    const document = await getDocs(q);
    var documentList = document.docs;
    for (let index = 0; index < documentList.length; index++) {
        const docitem = documentList[index];


        for (let i = 0; i < directorArray.length; i++) {
            const element = new RegExp(directorArray[i], "i");

            for (let j = 0; j < docitem.data().director.length; j++) {
                if (docitem.data().director[j].match(element)) {
                    const movie: Movie = { actors: docitem.data().actors, id: docitem.id, title: docitem.data().title, genres: docitem.data().genres, director: docitem.data().director, posterUrl: docitem.data().posterUrl, trailerUrl: docitem.data().trailerUrl, year: docitem.data().year };
                    returnArray.push(movie);
                };

            }

        }
    }
    return returnArray;
}


export async function getMovieByDirector(name: string[], movieArray?: Array<Movie>) {

        var directorArray: Array<string>
        directorArray = [];
        var returnArray: Array<Movie>
        returnArray = [];
        directorArray = name

        if (typeof (movieArray) !== 'undefined') {
            for (let index = 0; index < name.length; index++) {
                const element = new RegExp(name[index], "i");


                for (let index = 0; index < movieArray.length; index++) {
                    const element = movieArray[index]
                    if (element.director.some(item => directorArray.includes(item))) {
                        const movie: Movie = { actors: element.actors, id: element.id, title: element.title, genres: element.genres, director: element.director, year: element.year, trailerUrl: element.trailerUrl };
                        returnArray.push(element);
                    }
                }
            }
            return returnArray;
        }
        else {
            for (let index = 0; index < directorArray.length; index++) {
                directorArray[index].trim();
            }
            return getMovieByDirectorSoft(directorArray)
        }
    }
    // functions sorting arrays of movie interfaces and returning the sorted array. Taking in an array as every non backend function retuns an array
    export function sortAlphabetical(movieArray: [Movie], reverse: boolean) {
        // takes in an array of Movie interfaces and returns the array sorted by name alphabetically, or alphabetically in reverse depending on boolean
        if (reverse) {
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


    // custom sort function for movies
    function sortScore(movie1: Movie, movie2: Movie) {
        if (movie1.avrgScore && movie2.avrgScore) {
            return movie1.avrgScore - movie2.avrgScore
        }
        else {
            return 0
        }
    }
    // implementtion of sort functions
    export async function sortByScore(movies: Array<Movie>) {
        const coll = collection(db, 'moveReview')
        for (let index = 0; index < movies.length; index++) {
            const element = movies[index];
            const q = query(coll, where('moviedId', '==', element.id))
            const aggregate = await getAggregateFromServer(q, {
                totalScore: average('rating')
            });
            movies[index].avrgScore = aggregate.data().totalScore
        }

        return movies.sort(sortScore)

    }

    export async function getMovieByName(name: string, movieArray?: Array<Movie>) {
        var returnArray: Array<Movie> = [];
        const nameRegex = new RegExp(name, 'i');

        if (typeof (movieArray) !== 'undefined') {
            for (let index = 0; index < movieArray.length; index++) {
                const element = movieArray[index];
                if (element.title.match(nameRegex)) { 
                    returnArray.push(element);
                }
            }
            return returnArray;
        } else {
            const q = collection(db, 'movies');
            const documents = await getDocs(q);
            documents.docs.forEach((doc) => {
                if (doc.data().title.match(nameRegex)) { 
                    const movie: Movie = {
                        actors: doc.data().actors,
                        posterUrl: doc.data().posterUrl,
                        id: doc.id, 
                        title: doc.data().title,
                        genres: doc.data().genres,
                        director: doc.data().director,
                        year: doc.data().year,
                        trailerUrl: doc.data().trailerUrl
                    };
                    returnArray.push(movie);
                }
            });
            return returnArray;
        }
    }
