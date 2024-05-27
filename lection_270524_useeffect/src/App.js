import logo from './logo.svg';
import './App.css';
import ClicksCounter from './components/ClicksCounter';
import { useState } from 'react';

function App() {

  const [showCounter, setShowCounter] = useState(true);

  return (
    <div className="App">
      <h2>Counter Block</h2>
      <button onClick={() => {setShowCounter(old => !old)}}>Show/Hide Counter</button>
      {showCounter && <ClicksCounter />}

    </div>
  );
}

export default App;
