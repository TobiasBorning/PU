import './App.css';
import { useNavigate } from 'react-router-dom';

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
        <button onClick={() => sendTo('/ScrollingComponent')}>
          View scrolling page
        </button>
      </div>
    </div>
  );
}

export default App;
