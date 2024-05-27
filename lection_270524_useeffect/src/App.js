import logo from './logo.svg';
import './App.css';
import ClicksCounter from './components/ClicksCounter';
import { useEffect, useState } from 'react';
import DateTimeComponent from './components/DateTimeComponent';

function App() {

  const [showCounter, setShowCounter] = useState(true);

  const [products, setProducts] = useState( [] );
  /*
  4. В компоненте `App`, на фазе монтирования, запросите список товаров с бэка (адрес - `https://dummyjson.com/products`).
  */

  useEffect( () => {
    fetch('https://dummyjson.com/products')
      .then( resp => resp.json())
      .then( data => setProducts(data.products) );
  }, [] );

  return (
    <div className="App">
      <h2>Counter Block</h2>
      <button onClick={() => {setShowCounter(old => !old)}}>Show/Hide Counter</button>
      {showCounter && <ClicksCounter />}
      <h3>Current date block</h3>
      <DateTimeComponent />

      { products.map( prod => <p key={prod.id}>{prod.title}</p>)}

    </div>
  );
}

export default App;
