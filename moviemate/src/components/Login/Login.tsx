import React, { useState } from 'react';
import './Login.css';
import { handleLogin } from '../../utils/users/login';
import { auth, db} from '../../config/firebase';
import { useNavigate } from 'react-router-dom'; //*
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


 const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [sucess, setSucess] = useState<string>('');
    const navigate = useNavigate(); //*

    function isEmpty(input: string): boolean{
      return input.trim() === '';
    }

    const logUserIn = async () => {
      try{

        const userInDB = await signInWithEmailAndPassword(auth, email, password);
        const user = userInDB.user;
        const userExist = doc(db, 'users', user?.uid)
        const userExistInDb = await getDoc(userExist)

        if(!userExistInDb.exists()){
          throw new Error("User does not exist")
        }
        if (password.length <= 5){
          throw new Error("The password needs to be longer than 5 chars.")
        }

        if (isEmpty(password) || isEmpty(email)){
          throw new Error('Cannot leave an input empty.')
        }


        await handleLogin(auth, email, password); 
        setSucess('Logged user in');
        navigate('/main'); //*
      }
      catch (error : any) {
        console.error("User does not exist.", error.message);
        setSucess(error.message);

      }
    }

    const navigateBack = () => { 
      navigate('/');
    }

    return (
      <div className='container'>
        <p className='header'>Welcome to Moviemate</p>
        <p>{sucess}</p>
        <br></br>
        <input 
          className='inputField'
          type="text" 
          value={email} 
          placeholder="Email..."
          onChange={e => setEmail(e.target.value.trim())} 
        />
        <input 
          className='inputField'
          type="password" 
          value={password} 
          placeholder="Password..."
          onChange={e => setPassword(e.target.value.trim())} 
        />
        <br></br>
        <button type='submit' onClick={logUserIn}>Log in</button>
        <br></br>
        <button onClick={navigateBack}>{'< Back'}</button>
      </div>
    );
}
export default Login;
