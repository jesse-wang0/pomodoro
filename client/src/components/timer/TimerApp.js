import React, { Fragment, useState } from "react";
import Timer from "./Timer";

function TimerApp() {
  const longBreakInterval = 4;
  const [activeState, setActiveState] = useState('pomodoro');
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  const handlePomodoroComplete = () => {
    if (activeState === 'pomodoro') {
      setPomodorosCompleted(count => count + 1);
      if (pomodorosCompleted + 1 >= longBreakInterval) {
        setActiveState('longBreak');
        setPomodorosCompleted(0);
      } else {
        setActiveState('shortBreak');
      }
    } else {
      setActiveState('pomodoro');
    }
  };

  return (
    <Fragment>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Pomodoro</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Short Break</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Long Break</button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><Timer initialMinutes={25} onTimerComplete={handlePomodoroComplete}/></div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><Timer initialMinutes={5} onTimerComplete={handlePomodoroComplete}/></div>
        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"><Timer initialMinutes={10} onTimerComplete={handlePomodoroComplete}/></div>
      </div>
    </Fragment>
  );
}

export default TimerApp;