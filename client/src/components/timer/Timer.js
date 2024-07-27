import React, { Fragment, useState, useEffect , useRef } from "react";
import './Timer.css';
import '../../App.css';

function Timer({ initialMinutes, onTimerComplete }) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeMin, setTimeMin] = useState(initialMinutes);
  const [timeSec, setTimeSec] = useState(0);
  const endTimeRef = useRef(null);

  const updateTimer = (newMinutes) => {
    setTimeMin(newMinutes);
    setTimeSec(0);
  };

  useEffect(() => {
    updateTimer(initialMinutes);
  }, [initialMinutes]);
  
  useEffect(() => {
    if (isRunning) {
      const endTime = endTimeRef.current || Date.now() + (timeMin * 60 + timeSec) * 1000;
      endTimeRef.current = endTime;

      const intervalPom = setInterval(() => {
        const remainingTime = endTime - Date.now();
        if (remainingTime > 0) {
          const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
          const seconds = Math.floor((remainingTime / 1000) % 60);
          setTimeMin(minutes);
          setTimeSec(seconds);
        } else {
          setIsRunning(false);
          setTimeMin(initialMinutes);
          setTimeSec(0);
          endTimeRef.current = null;
          onTimerComplete();
        }
      }, 100);
      return () => clearInterval(intervalPom);
    }
  }, [isRunning, timeMin, timeSec, initialMinutes, onTimerComplete]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    endTimeRef.current = null;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeMin(initialMinutes);
    setTimeSec(0);
    endTimeRef.current = null;
  };

  return (
    <Fragment>
      <h2 id="clock" className="text-center my-5">{timeMin}:{timeSec < 10 ? "0" + timeSec : timeSec}</h2>
      <div className="timer-btn-container">
        <button className="btn btn-success d-flex justify-content-center shadow-sm" onClick={startTimer}>Start</button>
        <button className="btn btn-danger d-flex justify-content-center shadow-sm" onClick={stopTimer}>Pause</button>
        <button className="btn btn-warning d-flex justify-content-center shadow-sm" onClick={resetTimer}>Reset</button>
      </div>
    </Fragment>
  );
}

export default Timer;