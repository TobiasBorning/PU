import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const handleCreateUser = async (auth: any, email: string, password: string, firstname: string, lastname: string) => {
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
        return true;
    } catch(err) {
        return false;
    }
    
}

export const handleLogin = async (auth:any, email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password); 
        return true;
    } catch(err) {
        return false;
    }
    
}   
