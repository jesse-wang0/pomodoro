import React, { Fragment } from "react";
import './Timer.css';

function TimerSettings({ pomodoroMins, setPomodoroMins, shortBreakMins, setShortBreakMins, longBreakMins, setLongBreakMins, breakInterval, setBreakInterval}) {
  return (
    <Fragment>
      <button type="button" className="settings-btn btn btn-secondary shadow-sm" data-bs-toggle="modal"
        data-bs-target='#settings'> <span className="bi-gear"></span>  Settings </button>

      {/* Make sure to handle onclick for exiting the settings menu */}
      <div className="modal fade" id='settings'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"><span className="bi-gear"></span>Settings</h5>
              <button type="button" className="btn-close"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h4> <span className="bi-clock"></span> Timer</h4>
              <div id='length-options'>
                <div>
                  <p>Pomodoro</p>
                  <input type="number" min="0" className="form-control" id="amountInput" value={pomodoroMins} onChange={e => setPomodoroMins(e.target.value)}></input>
                </div>
                <div>
                  <p>Short Break</p>
                  <input type="number" min="0" className="form-control" id="amountInput" value={shortBreakMins} onChange={e => setShortBreakMins(e.target.value)}></input>
                </div>
                <div>
                  <p>Long Break</p>
                  <input type="number" min="0" className="form-control" id="amountInput" value={longBreakMins} onChange={e => setLongBreakMins(e.target.value)}></input>
                </div>
              </div>
              <p className="mt-4">Long Break Interval</p>
              <input type="number" min="1" className="form-control" id="amountInput" value={breakInterval} onChange={e => setBreakInterval(e.target.value)}></input>

              <h4 className="mt-4"> <span className="bi-volume-up"></span> Sound</h4>
              <div id="sound-options">
                <p>Play Sound:</p>
                <select className="form-select" aria-label="Default select example" defaultValue="Normal">
                  <option value="Normal">Normal</option>
                  <option value="Alarm">Alarm</option>
                  <option value="Digital">Digital</option>
                  <option value="Bell">Bell</option>
                  <option value="Bird">Bird</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary"
                data-bs-dismiss="modal"
              > Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TimerSettings;