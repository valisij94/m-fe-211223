/*
3. Создайте компонент `DateTimeComponent`, которы будет показывать время и дату (в текущей локализации) с точностью до секунды.
*/

import { useEffect, useState } from "react";


// const date = new Date().toLocaleString()

export default function DateTimeComponent() {

  /**
   * 1. Объявить state через хук useState,  в котором бы юудем хранить наши время и дату
   * 2. Использовать эффект (на ФАЗУ МОНТИРОВАНИЯ)
   * 3. В эффекте, зарядить интервал, который будет каждую секунду обновлять state текущими временем и датой
   * 4. Не забыть подчистить за собой
   */

  const [currentDate, setCurrentDate] = useState(new Date().toLocaleString());

  useEffect( () => {
    const intervalId = setInterval( () => {
      setCurrentDate( new Date().toLocaleString() );
    }, 1000);
    return () => {
      clearInterval( intervalId );
    }
  }, []);

  return (
    <p>{currentDate}</p>
  );
}
