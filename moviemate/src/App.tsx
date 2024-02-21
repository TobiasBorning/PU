import './App.css';
import { useNavigate } from 'react-router-dom'; //*

function App() {
  const navigate = useNavigate();

  const sendTo = (link: string) => {
    navigate(link);
  }

  return (
    <div className="container">
      <h1>Moviemate</h1>
      <br />
      <div>
      <button onClick={() => sendTo('/login')}>
        Log in
      </button>
      <button onClick={() => sendTo('/signup')}>
        Sign up
      </button>
      <button onClick={() => sendTo('/Main')}>
        Dashboard
      </button>
      </div>
    </div>
  );
}

export default App;
