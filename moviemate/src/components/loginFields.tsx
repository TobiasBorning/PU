import React, { useEffect } from 'react';
import { useState } from 'react';
import { auth, db } from '../config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getUser, User } from '../utils/users';

const LoginFields: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [user, setUser] = useState<User>();

    const handleCreateUser = async () => {
        console.log('Email:', email);
        console.log('Password:', password)
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user) {
            const userDoc = doc(db, 'users', user.uid);
            await setDoc(userDoc, {
                email: user.email,
                firstname: firstname,
                lastname: lastname
            });
            const fetchedUser = await getUser(auth.currentUser?.uid || '');
            setUser(fetchedUser);
        }
    }

    const handleLogin = async () => {
        await signInWithEmailAndPassword(auth, email, password);   
    }

    const printInfo = async () => {
        const user = await getUser(auth.currentUser?.uid || '');
        console.log('Hello,',  user.firstname, user.lastname);
        setUser(user);
    }

    useEffect(() => {
        console.log('Ran useEffect', auth.currentUser?.uid, 'logged in');
        const fetchUser = async () => {
            try {
                const user = await getUser(auth.currentUser?.uid || '');
                setUser(user);
            }
            catch (err) {
                console.log(err);
            }
        };
        const timeoutId = setTimeout(fetchUser, 500);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div>
            <p>
                {
                    auth.currentUser ? `Hei, ${user?.firstname} ${user?.lastname}` : ''
                }
            </p>
            <input 
                type="text" 
                value={email} 
                placeholder="Email..."
                onChange={e => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                value={password} 
                placeholder="Password..."
                onChange={e => setPassword(e.target.value)} 
            />
            <br />
            <input 
                type="text" 
                value={firstname} 
                placeholder="Firstname..."
                onChange={e => setFirstname(e.target.value)}
            />
            <input 
                type="text" 
                value={lastname} 
                placeholder="Lastname..."
                onChange={e => setLastname(e.target.value)}
            />
            <br /> 
            <button onClick={handleCreateUser}>Create user</button>
            <button onClick={handleLogin}>Log in</button>
            <br />
            <button onClick={printInfo}>Print Login Info</button>
        </div>
    );
}

export default LoginFields;