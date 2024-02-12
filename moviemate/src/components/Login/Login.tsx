import React, { useState } from 'react';
import './Login.css';
import { handleLogin } from '../../utils/login';
import { auth } from '../../config/firebase';

 const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [sucess, setSucess] = useState<string>('');

    const logUserIn = () => {
      console.log("Log user in")
      try {
        handleLogin(auth, email, password);
        setSucess('Logged user in')
      } catch (err) {
        console.log(err)
        setSucess('Error loggin user in')
    }
    }

    return (
        <div className='container'>
          <p className='header'>Welcome to Moviemate</p>
          <p>{sucess}</p>
          <br></br>
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
        <button type='submit' onClick={logUserIn} className='button'>Log in</button>
        </div>
    );
}

export default Login;
