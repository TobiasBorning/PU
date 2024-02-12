import React from 'react';
import './SignUp.css';

class SignUp extends React.Component {
  render() {
      return (
          <div className='container'>
            <p className='header'>Welcome to Moviemate</p>
            <br></br>
            <label className='labelText'>
            Name:
            <input type="text" className='inputField'/>
            <br></br>
            </label>
            <label className='labelText'>
              Email: 
              <input type='text' className='inputField'/>
              <br></br>
            </label>
            <label className='labelText'>
                Username: 
              <input type='text' className='inputField'/>
            </label>
            <br></br>
            <label className='labelText'>
              Password:  
              <input type='text' className='inputField'/>
              <br></br>
            </label>

          <button type='submit' className='button'>Sign Up</button>
          </div>
      );
  }
}

export default SignUp;