import React from 'react';
import './Login.css';

class Login extends React.Component {
  render() {
      return (
          <div className='container'>
            <p className='header'>Welcome to Moviemate</p>
            <br></br>
            <label className='labelText'>
            Email:
            <input type="text" className='inputField'/>
            </label>
            <label className='labelText'>
              Password:  
              <input type='text' className='inputField'/>
            </label>
          <button type='submit' className='button'>Log in</button>
          </div>
      );
  }
}

export default Login;
