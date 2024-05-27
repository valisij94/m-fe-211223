import { useState } from "react";

export default function ClicksCounter() {

  const [clicks, setClicks] = useState(0);

  const clicksHandler = () => {
    setClicks(old => old + 1);
  }
  return (
    <div className="clicksCounterContainer">
      <p>{`You clicked ${clicks} times!`}</p>
      <button onClick={clicksHandler}>Clck me please!</button>
    </div>
  );
}