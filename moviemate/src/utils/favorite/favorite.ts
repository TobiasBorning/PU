import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";


/**
 * Method for favorite director
 * 
 * @param uid 
 * @param directorName 
 */
export const favoriteDirector = (uid: string, directorName: string) => {
    const userDocRef = doc(db, "users", uid);
    getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
            const user = doc.data();
            if (!user?.favoriteDirectors) {
                user.favoriteDirectors = [] as string[];
            }
            if (user) {
                const favoriteDirectors: string[] = user.favoriteDirectors;
                if (!favoriteDirectors.includes(directorName)) {
                    favoriteDirectors.push(directorName);
                    setDoc(userDocRef, { favoriteDirectors }, { merge: true });
                }
            }
        } else {
            throw new Error("No such document!");
        }
    });
}

/**
 * Method for favorite genre
 * @param uid 
 * @param genreName 
 */

export const favoriteGenre = (uid: string, genreName: string) => {
    const userDocRef = doc(db, "users", uid);
    getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
            const user = doc.data();
            if (!user?.favoriteGenres) {
                user.favoriteGenres = [] as string[];
            }
            if (user) {
                const favoriteGenres: string[] = user.favoriteGenres;
                if (!favoriteGenres.includes(genreName)) {
                    favoriteGenres.push(genreName);
                    setDoc(userDocRef, { favoriteGenres }, { merge: true });
                }
            }
        } else {
            throw new Error("No such document!");
        }
    });
}
/**
 * Method for unvavorite director
 * 
 * @param uid 
 * @param directorName 
 */
export const unfavoriteDirector = (uid: string, directorName: string) => {
    const userDocRef = doc(db, "users", uid);
    getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
            const user = doc.data();
            if (!user?.favoriteDirectors) {
                user.favoriteDirectors = [] as string[];
            }
            if (user) {
                const favoriteDirectors = user.favoriteDirectors;
                const index = favoriteDirectors.indexOf(directorName);
                if (index > -1) {
                    favoriteDirectors.splice(index, 1);
                }
                setDoc(userDocRef, { favoriteDirectors }, { merge: true });
            }
        } else {
            throw new Error("No such document!");
        }
    });
}
/**
 * Method for unfavorite genre
 * 
 * @param uid 
 * @param genreName 
 */
export const unfavoriteGenre = (uid: string, genreName: string) => {
    const userDocRef = doc(db, "users", uid);
    getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
            const user = doc.data();
            if (!user?.favoriteGenres) {
                user.favoriteGenres = [] as string[];
            }
            if (user) {
                const favoriteGenres = user.favoriteGenres;
                const index = favoriteGenres.indexOf(genreName);
                if (index > -1) {
                    favoriteGenres.splice(index, 1);
                }
                setDoc(userDocRef, { favoriteGenres }, { merge: true });
            }
        } else {
            throw new Error("No such document!");
        }
    });
}

/**
 * Method for getting favorite directors
 * 
 * @param uid 
 * @returns 
 */
export const getFavoriteDirectors = (uid: string): Promise<string[]> => {
    try {
        const userDocRef = doc(db, "users", uid);
        return getDoc(userDocRef).then((doc) => { return doc.data()?.favoriteDirectors });
    } catch (error) {
        throw error;
    }
}

/**
 * Method for getting favorite genres
 * 
 * @param uid 
 * @returns 
 */
export const getFavoriteGenres = (uid: string): Promise<string[]> => {
    try {
        const userDocRef = doc(db, "users", uid);
        return getDoc(userDocRef).then((doc) => { return doc.data()?.favoriteGenres });
    } catch (error) {
        throw error;
    }
}

/**
 * Method for checking if director is favorite
 * 
 * @param uid 
 * @param directorName 
 * @returns boolean
 */
export const isFavoriteDirector = (uid: string, directorName: string): Promise<boolean> => {
    try {
        const userDocRef = doc(db, "users", uid);
        return getDoc(userDocRef).then((doc) => {
            const user = doc.data();
            if (!user?.favoriteDirectors) {
                return false;
            }
            return user.favoriteDirectors.includes(directorName);
        });
    } catch (error) {
        throw error;
    }
}

/**
 * Method for checking if genre is favorite
 * 
 * @param uid 
 * @param genreName 
 * @returns boolean
 */
export const isFavoriteGenre = (uid: string, genreName: string): Promise<boolean> => {
    try {
        const userDocRef = doc(db, "users", uid);
        return getDoc(userDocRef).then((doc) => {
            const user = doc.data();
            if (!user?.favoriteGenres) {
                return false;
            }
            return user.favoriteGenres.includes(genreName);
        });
    } catch (error) {
        throw error;
    }
}