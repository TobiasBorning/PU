import './App.css';
import BasicComponent from './components/basicComponent';
import TextLayout from './components/textLayout';
import LoginFields from './components/loginFields';

function App() {

  return (
    <div className="App">
      <TextLayout />
      <BasicComponent />
      <LoginFields />
    </div>
  );
}

export default App;
