import React, { Fragment } from "react";
import './Statistics.css';

function BasicStatistics({ sessions }) {
  const { dayCount, dayTime, weekCount, weekTime, monthCount, monthTime, yearCount, yearTime } = sessions;

  return (
    <Fragment>
      <div className='title'>
        <h3 className='my-4'>Pomodoros Completed</h3>
      </div>

      <div className='header-info'>
        <div className="stat">
          <h5>Today</h5>
          <h4 className='stat-text'>{dayCount}</h4>
          <p>
            <span className='stat-text'>{dayTime}</span> hours
          </p>
        </div>

        <div className='stat'>
          <h5>This Week</h5>
          <h4 className='stat-text'>{weekCount}</h4>
          <p>
            <span className='stat-text'>{weekTime}</span> hours
          </p>
        </div>

        <div className='stat'>
          <h5>This Month</h5>
          <h4 className='stat-text'>{monthCount}</h4>
          <p>
            <span className='stat-text'>{monthTime}</span> hours
          </p>
        </div>

        <div className='stat'>
          <h5>This Year</h5>
          <h4 className='stat-text'>{yearCount}</h4>
          <p>
            <span className='stat-text'>{yearTime}</span> hours
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default BasicStatistics;