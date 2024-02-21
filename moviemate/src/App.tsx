import './App.css';
import { useNavigate } from 'react-router-dom'; //*

function App() {
  const navigate = useNavigate();

  return (  
    <div className="container">
      <h1 className='header'>Moviemate</h1>
      <br />
      <div>
        <button onClick={() => navigate('/login')}>
          Log in
        </button>
        <button onClick={() => navigate('/signup')}>
          Sign up
        </button>
      </div>
    </div>
  );
}

export default App;
