import React, { useState } from 'react';
import './SignUp.css';
import { handleCreateUser } from '../../utils/login/login';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const navigate = useNavigate();

  const createUser = async () => {
    if (await handleCreateUser(auth, email, password, firstname, lastname)) {
      setResponse('Signed in');
      navigate('/main');
    }
    else {
      setResponse('Error signin up');
    }
  }

  const navigateBack = () => { 
    navigate('/');
  }
  
  return (
    <div className='container'>
      <p className='header'>Welcome to Moviemate</p>
      <br></br>
      <p>{response}</p>
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
      <br />
      <input 
          className='inputField'
          type="text" 
          value={firstname} 
          placeholder="Firstname..."
          onChange={e => setFirstname(e.target.value.trim())}
      />
      <input 
          className='inputField'
          type="text" 
          value={lastname} 
          placeholder="Lastname..."
          onChange={e => setLastname(e.target.value.trim())}
      />
      <br></br>
      <p>Password must be at least 6 characters long</p>
      <br />
      <button type='submit' onClick={createUser}>Sign Up</button>
      <br></br>
      <button onClick={navigateBack}>{'< Back'}</button>
    </div>
  );
}
export default SignUp;