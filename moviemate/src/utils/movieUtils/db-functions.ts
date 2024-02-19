import { Collection } from 'typescript';
import { db } from '../../config/firebase';
import { CollectionReference, addDoc, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
export{getMovieById};

// not implemented, will be a pain to do.
// function getRecomendedByOtherUsers(userId: String){
//     //query firebase users by liked genres, movies seen by other users but not current user, sort by score
    
// }
// function getField(fieldName: string, collectionName: string){
//     const toGet = collection(db, collectionName);
//     const dbcall = 


// }

// unused function, planned to be added with db entry in user for preffered genres

// returns uerySnapshot of data containing all movies with genres matching users prefered genres.
// async function getRecommended(userId: String){
//     //query movies by genres in user preference,
//     const users = collection(db, "users");
//     const movies = collection(db, "movies");
//     const userDoc = getUserById(userId);

//     var genresList: string[] = [];
//     // henter ut alle genres i docs, gjøres på denne måten siden front-end ikke vet om det kommer ett eller flere dokumenter.
//     (await
//         // henter ut alle genres i docs, gjøres på denne måten siden front-end ikke vet om det kommer ett eller flere dokumenter.
//         userDoc).forEach((doc) => {
//         genresList.concat((doc.data().genres as string[]));
//     });
    
//     const docUsers = await getDocs(query(movies, where( "genres", "array-contains-any", genresList)))
//     return docUsers;

// }
// returns query needed to use data

async function getMovieById(movieId: String){
    //query users, id
    const movies = collection(db, "users");
    return await getDocs(query(movies, where("Document ID", "==", movieId)));
}
async function getMovierByName(movieName: String){
    //query by user name
    const users = collection(db, "users");
    return await getDocs(query(users, where("title", "==", movieName)));
}


async function getUserById(userId: String){
    //query users, id
    const users = collection(db, "users");
    return await getDocs(query(users, where("Document ID", "==", userId)));
}

// returns Collection reference to user entity that matches userName
async function getUserByName(userName: String){
    //query by user name
    const users = collection(db, "users");
    return await getDocs(query(users, where("name", "==", "userName")));
}
