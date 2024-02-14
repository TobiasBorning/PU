import React, { useState } from 'react';
import './Login.css';
import { handleLogin } from '../../utils/login/login';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom'; //*


 const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [sucess, setSucess] = useState<string>('');
    const navigate = useNavigate(); //*

    const logUserIn = async () => {
      if (await handleLogin(auth, email, password)) {
        setSucess('Logged user in');
        navigate('/main'); //*
      }
      else {
        setSucess('Error loggin in');
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
