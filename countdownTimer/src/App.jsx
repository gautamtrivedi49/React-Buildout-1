import React, { useState } from 'react';
import './app.css';

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [countdownInterval, setCountdownInterval] = useState(null);
  const [countdownComplete, setCountdownComplete] = useState(false);

  const handleChange = (event) => {
    setTargetDate(event.target.value);
    setCountdownComplete(false);
  };

  const toggleCountdown = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      setCountdownInterval(null);
      setTargetDate('');
      setRemainingTime(0);
      setCountdownComplete(false);
    } else {
      if (targetDate) {
        const targetTime = new Date(targetDate).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = targetTime - currentTime;
        if (timeDifference > 0) {
          setRemainingTime(timeDifference);
          const interval = setInterval(() => {
            setRemainingTime((prevTime) => {
              if (prevTime <= 1000) {
                setCountdownComplete(true);
                clearInterval(interval);
                return 0;
              }
              return prevTime - 1000;
            });
          }, 1000);
          setCountdownInterval(interval);
        } else {
          alert('Please select a future date and time.');
        }
      } else {
        alert('Please select a date and time.');
      }
    }
  };

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return (
      <div className="countdown-time">
        <div className="countdown-unit"><h2>{days}</h2> Days</div>
        <div className="countdown-unit"><h2>{hours}</h2> Hours</div>
        <div className="countdown-unit"><h2>{minutes}</h2> Minutes</div>
        <div className="countdown-unit"><h2>{seconds}</h2> Seconds</div>
      </div>
    );
  };

  return (
    <div className="countdown-container">
      <h1 className="countdown-title">Countdown <span className='span-title'>Timer</span></h1>
      <input className="countdown-input" type="datetime-local" value={targetDate} onChange={handleChange} />
      <br />
      <button className="countdown-button" onClick={toggleCountdown}>
        {countdownInterval ? 'Cancel Timer' : 'Start Timer'}
      </button>
      <div className="countdown-display">
        {countdownComplete ? (
          <h2 className="countdown-message">The countdown is over! What's your next adventure</h2>
        ) : (
          formatTime(remainingTime)
        )}
      </div>
    </div>
  );
}

export default CountdownTimer;