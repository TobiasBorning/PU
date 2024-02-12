import './App.css';
import BasicComponent from './components/basicComponent';
import TextLayout from './components/textLayout';
import LoginFields from './components/loginFields';


function App() {

  return (
    <div className="App">
      <TextLayout />
      <BasicComponent />
      <li><a href="/login">Login</a></li>
      <li><a href="/signup">Sign Up</a></li>
    </div>
  );
}

export default App;
