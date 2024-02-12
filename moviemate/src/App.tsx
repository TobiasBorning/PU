import './App.css';
import BasicComponent from './components/basicComponent';
import ScrollingComponent from './components/scrollingPage';
import TextLayout from './components/textLayout';

function App() {

  return (
    <div className="App">
      <TextLayout /> 
      <BasicComponent /> 
      <ScrollingComponent />
    </div>
  );
}

export default App;
