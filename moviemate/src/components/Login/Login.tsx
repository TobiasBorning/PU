import React, { useState } from 'react';
import './Login.css';
import { handleLogin } from '../../utils/login/login';
import { auth, db} from '../../config/firebase';
import { useNavigate } from 'react-router-dom'; //*


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
        if (isEmpty(password) || isEmpty(email)){
          throw new Error('Cannot leave an input empty.')
        }

        const login = await handleLogin(auth, email, password);
        if (login === 'Success!') {
          setSucess('Logged user in');
          navigate('/main'); //*
        } else {
          setSucess(login); 
        }
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
