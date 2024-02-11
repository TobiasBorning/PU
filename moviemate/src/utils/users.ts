import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

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
