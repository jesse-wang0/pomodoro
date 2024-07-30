import React, { Fragment } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import './Statistics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ sessions }) {
  if (!sessions || Object.keys(sessions).length === 0) {
    console.log('Loading');
    return;
  }

  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [{
      label: 'Hours Completed',
      data: Object.values(sessions),
      backgroundColor: ['rgba(0, 180, 10, 0.4)'],
      borderColor: ['rgb(0,0,0,0.5)'],
      borderWidth: 1
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false
  };

  return (
    <Fragment>
      <div className='title'>
        <h3 className='mt-5'>Weekly Frequency</h3>
      </div>
      <div className="graph"><Bar options={options} data={data} /></div>

    </Fragment>
  );
}

export default BarChart;