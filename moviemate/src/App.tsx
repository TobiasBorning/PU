import './App.css';
import BasicComponent from './components/basicComponent';
import TextLayout from './components/textLayout';
import { testFetchJson } from './utils/movieUtils/fetchAndFillDb';
function App() {

  return (
    <div className="App">
      <button onClick={testFetchJson}>Click</button>
      <TextLayout  />
      <BasicComponent />
    </div>
  );
}

export default App;
