import { useEffect, useState } from "react";

export default function ClicksCounter() {

  const [clicks, setClicks] = useState(0);

  const clicksHandler = () => {
    setClicks( (prev) => {
      return prev + 1;
    } );
  }

  /*
  В компонент ClicksCounter, добавьте код, чтобы он каждую секунду выводил в консоль сообщение "Сlicked N times!", где N - количество кликов из локального стейта.
  */

  useEffect( () => {
    const intervalId = setInterval( () => {
      console.log('Something!' + clicks);
    }, 1000);
    return () => {
      console.log('Cleanup')
      clearInterval(intervalId);
    }
  }, [clicks]);

  return (
    <div className="clicksCounterContainer">
      <p>{`You clicked ${clicks} times!`}</p>
      <button onClick={clicksHandler}>Clck me please!</button>
    </div>
  );
}