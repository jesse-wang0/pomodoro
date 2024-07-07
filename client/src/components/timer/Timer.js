import React, { Fragment, useState, useEffect } from "react";

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeMin, setTimeMin] = useState(25);
  const [timeSec, setTimeSec] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const intervalPom = setInterval(() => {
        if (timeSec > 0) {
          setTimeSec((timeSec) => timeSec - 1);
        }
        if (timeSec === 0 && timeMin > 0) {
          setTimeMin((timeMin) => timeMin - 1);
          setTimeSec(59);
        }
        if (timeMin === 0 && timeSec === 0) {
          setIsRunning(false);
        }
      }, 1000)
      return () => clearInterval(intervalPom)
    }
  }, [isRunning, timeMin, timeSec])

  const startTimer = () => {
    setIsRunning(true);
  }

  const stopTimer = () => {
    setIsRunning(false);
  }

  return (
    <Fragment>
      <h2>Timer</h2>
      <h2>{timeMin}:{timeSec < 10 ? "0" + timeSec : timeSec}</h2>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Pause</button>
      <button>Reset</button>
    </Fragment>
  );
}

export default Timer;