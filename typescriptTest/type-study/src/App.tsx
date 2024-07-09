import logo from './logo.svg';
import './App.css';
import TestComp from './CHp8/TestComp';
import { MarbleEvent } from './test/Class';

function App() {
  const marbleEvent = new MarbleEvent();
  if (marbleEvent.hasNext('move')) {
    console.log(typeof marbleEvent);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
