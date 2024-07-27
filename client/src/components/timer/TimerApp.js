import React, { useState, useRef, Fragment } from "react";
import Timer from "./Timer";
import './Timer.css';
import TimerSettings from "./TimerSettings";

function TimerApp() {
  const [activeState, setActiveState] = useState('pomodoro');
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  const [pomodoroMins, setPomodoroMins] = useState(25);
  const [shortBreakMins, setShortBreakMins] = useState(5);
  const [longBreakMins, setLongBreakMins] = useState(10);
  const [breakInterval, setbreakInterval] = useState(3);

  const pomodoroRef = useRef(null);
  const shortBreakRef = useRef(null);
  const longBreakRef = useRef(null);

  const onPomodoroFinish = async () => {
    try {
      const date = new Date().toISOString();
      console.log(pomodoroMins);
      console.log(date);
      const body = { duration: pomodoroMins | 0, end_time: date }; 
      const response = await fetch("http://localhost:5000/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  }

  const handlePomodoroComplete = () => {
    if (activeState === 'pomodoro') {
      setPomodorosCompleted(count => count + 1);
      onPomodoroFinish();
      if (pomodorosCompleted + 1 > breakInterval) {
        setActiveState('longBreak');
        setPomodorosCompleted(0);
        longBreakRef.current.click();
      } else {
        setActiveState('shortBreak');
        shortBreakRef.current.click();
      }
    } else {
      setActiveState('pomodoro');
      pomodoroRef.current.click();
    }
  };

  return (
    <Fragment>
      <div>
        <div className="timer-app-container">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" ref={pomodoroRef} id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Pomodoro</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" ref={shortBreakRef} id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Short Break</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" ref={longBreakRef} id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Long Break</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><Timer initialMinutes={pomodoroMins} onTimerComplete={handlePomodoroComplete} /></div>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><Timer initialMinutes={shortBreakMins} onTimerComplete={handlePomodoroComplete} /></div>
            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"><Timer initialMinutes={longBreakMins} onTimerComplete={handlePomodoroComplete} /></div>
          </div>
        </div>
        <TimerSettings
          pomodoroMins={pomodoroMins}
          setPomodoroMins={setPomodoroMins}
          shortBreakMins={shortBreakMins}
          setShortBreakMins={setShortBreakMins}
          longBreakMins={longBreakMins}
          setLongBreakMins={setLongBreakMins} 
          breakInterval={breakInterval}
          setBreakInterval={setbreakInterval}/>
      </div>
    </Fragment>
  );
}

export default TimerApp;