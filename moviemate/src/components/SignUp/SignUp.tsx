import React, { useState } from 'react';
import './SignUp.css';
import { handleCreateUser } from '../../utils/login';
import { auth } from '../../config/firebase';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [sucess, setSucess] = useState<string>('');

  const createUser = () => {
    console.log("Log user in")
    try {
      handleCreateUser(auth, email, password, firstname, lastname);
      setSucess('Logged user in')
    } catch (err) {
      console.log(err)
      setSucess('Error loggin user in')
    }
    
  }

  return (
    <div className='container'>
      <p className='header'>Welcome to Moviemate</p>
      <br></br>
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
      <button type='submit' onClick={createUser} className='button'>Sign Up</button>
    </div>
  );
}


export default SignUp;