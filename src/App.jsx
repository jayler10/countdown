import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);

  useEffect(() => {
    const countToDate = new Date('2024-11-24T00:00:00');

    const updateTime = () => {
      const currentDate = new Date();
      const timeLeft = Math.ceil((countToDate - currentDate) / 1000);
      flipAllCards(timeLeft);
    };

    const flipAllCards = (time) => {
      const days = Math.floor(time / (3600 * 24));
      const hours = Math.floor((time % (3600 * 24)) / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;

      setDaysLeft(days);
      setHoursLeft(hours);
      setMinutesLeft(minutes);

      flipCard('[data-tens="data-days-tens"]', Math.floor(days / 10));
      flipCard('[data-ones="data-days-ones"]', days % 10);
      flipCard('[data-tens="data-hours-tens"]', Math.floor(hours / 10));
      flipCard('[data-ones="data-hours-ones"]', hours % 10);
      flipCard('[data-tens="data-minutes-tens"]', Math.floor(minutes / 10));
      flipCard('[data-ones="data-minutes-ones"]', minutes % 10);
      flipCard('[data-tens="data-seconds-tens"]', Math.floor(seconds / 10));
      flipCard('[data-ones="data-seconds-ones"]', seconds % 10);
    };

    const flipCard = (selector, newNumber) => {
      const flipCardElement = document.querySelector(selector);
      if (!flipCardElement) return;
      const topHalf = flipCardElement.querySelector('.top');
      const startNumber = parseInt(topHalf.textContent, 10);

      if (newNumber === startNumber) return;

      const bottomHalf = flipCardElement.querySelector('.bottom');
      const topFlip = createFlipElement('top-flip', startNumber);
      const bottomFlip = createFlipElement('bottom-flip', newNumber);

      topFlip.addEventListener('animationstart', () => {
        topHalf.textContent = newNumber;
      });

      topFlip.addEventListener('animationend', () => {
        topFlip.remove();
      });

      bottomFlip.addEventListener('animationend', () => {
        bottomHalf.textContent = newNumber;
        bottomFlip.remove();
      });

      flipCardElement.append(topFlip, bottomFlip);
    };

    const createFlipElement = (className, number) => {
      const flipElement = document.createElement('div');
      flipElement.classList.add(className);
      flipElement.textContent = number;
      return flipElement;
    };

    const interval = setInterval(updateTime, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {daysLeft > 0 && (
        <>
          <Segment title="Días" dataTens="data-days-tens" dataOnes="data-days-ones" showColon={true} />
          <Segment title="Horas" dataTens="data-hours-tens" dataOnes="data-hours-ones" showColon={false} />
        </>
      )}
      {daysLeft === 0 && hoursLeft > 0 && (
        <>
          <Segment title="Horas" dataTens="data-hours-tens" dataOnes="data-hours-ones" showColon={true} />
          <Segment title="Minutos" dataTens="data-minutes-tens" dataOnes="data-minutes-ones" showColon={false} />
        </>
      )}
      {daysLeft === 0 && hoursLeft === 0 && (
        <>
          <Segment title="Minutos" dataTens="data-minutes-tens" dataOnes="data-minutes-ones" showColon={true} />
          <Segment title="Segundos" dataTens="data-seconds-tens" dataOnes="data-seconds-ones" showColon={false} />
        </>
      )}
    </div>
  );
  
  
};

const Segment = ({ title, dataTens, dataOnes, showColon }) => (
  <div className="container-segment">
    <div className="segment">
      <div className="flip-card" data-tens={dataTens}>
        <div className="top">0</div>
        <div className="bottom">0</div>
      </div>
      <div className="flip-card" data-ones={dataOnes}>
        <div className="top">0</div>
        <div className="bottom">0</div>
      </div>
      {showColon && <span className="colon">:</span>} {/* Mostrar los dos puntos solo si showColon es true */}
    </div>
    
    <div className="segment-title">{title}</div>
  </div>
);



export default App;
