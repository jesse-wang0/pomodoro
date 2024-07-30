import React, { Fragment } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from "react-chartjs-2";
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import './Statistics.css';
import 'chartjs-adapter-date-fns';

// Register Chart.js components
ChartJS.register(...registerables);
ChartJS.register(MatrixController, MatrixElement);

function isoDayOfWeek(dt) {
  let wd = dt.getDay();
  wd = (wd + 6) % 7 + 1;
  return '' + wd;
}

function generateData() {
  const d = new Date();
  const today = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
  const data = [];
  const end = today;
  let dt = new Date(new Date().setDate(end.getDate() - 365));
  while (dt <= end) {
    const iso = dt.toISOString().substring(0, 10);
    data.push({
      x: iso,
      y: isoDayOfWeek(dt),
      d: iso,
      v: Math.random() * 50
    });
    dt = new Date(dt.setDate(dt.getDate() + 1));
  }
  return data;
}

function HeatMap({ yearData }) {
  const data = {
    datasets: [{
      label: 'Pomodoros',
      data: generateData(),
      backgroundColor(c) {
        const value = c.dataset.data[c.dataIndex].v;
        const alpha = (10 + value) / 60;
        return `rgba(0, 200, 0, ${alpha})`;
      },
      borderColor: 'green',
      borderWidth: 1,
      borderRadius: 2,
      hoverBackgroundColor: 'rgba(200, 200, 200,0.2)',
      hoverBorderColor: 'rgba(200, 0, 200,1)',
      width(c) {
        const a = c.chart.chartArea || {};
        return (a.right - a.left) / 53 - 1;
      },
      height(c) {
        const a = c.chart.chartArea || {};
        return (a.bottom - a.top) / 7 - 1;
      }
    }],
  };
  const scales = {
    y: {
      type: 'time',
      offset: true,
      time: {
        unit: 'day',
        round: 'day',
        isoWeek: 1,
        parser: 'i',
        displayFormats: {
          day: 'iii'
        }
      },
      reverse: true,
      position: 'right',
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        padding: 1,
        font: {
          size: 9
        }
      },
      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0,
      }
    },
    x: {
      type: 'time',
      position: 'bottom',
      offset: true,
      time: {
        unit: 'week',
        round: 'week',
        isoWeekDay: 1,
        displayFormats: {
          week: 'MMM dd'
        }
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        font: {
          size: 9,
        }
      },
      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0,
      }
    }
  };

  const options = {
    scales: scales,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            const date = context[0].raw.x;
            return new Date(date).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

          },
          label: function (context) {
            return context.dataset.label + ': ' + context.raw.v;
          }
        }
      }
    },
    maintainAspectRatio: false
  };
  return (
    <Fragment>
      <div className='title'>
        <h3 className='mt-5'>Yearly Frequency</h3>
      </div>
      <div className='mb-5 heatmap'>
        <Chart type='matrix' data={data} options={options} scales={scales} />
      </div>
    </Fragment>
  );
}

export default HeatMap;