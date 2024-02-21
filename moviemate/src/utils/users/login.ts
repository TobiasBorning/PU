import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export const handleCreateUser = async (auth: any, email: string, password: string, firstname: string, lastname: string) : Promise<string> => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user) {
            const userDoc = doc(db, 'users', user.uid);
            await setDoc(userDoc, {
                email: user.email,
                firstname: firstname,
                lastname: lastname
            });
        }
        return "Success!"
    } catch(err) {
        if (err instanceof FirebaseError) {
            return err.message.replace("-", " ");
        }
        return "An error occurred. Please try again.";
    }
    
}

export const handleLogin = async (auth:any, email: string, password: string) : Promise<string> => {
    try {
        await signInWithEmailAndPassword(auth, email, password); 
        return "Success!";
    } catch(err) {
        if (err instanceof FirebaseError) {
            return err.message.replace("-", " ");
        }   
        return "An error occurred. Please try again.";
    }
    
}   
