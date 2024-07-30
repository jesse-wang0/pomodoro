import React, { Fragment } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from "react-chartjs-2";
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import './Statistics.css';
import 'chartjs-adapter-date-fns';

// Register Chart.js components
ChartJS.register(...registerables);
ChartJS.register(MatrixController, MatrixElement);

function HeatMap({ sessions }) {
  if (!sessions || Object.keys(sessions).length === 0) {
    console.log('Loading');
    return;
  }

  const data = {
    datasets: [{
      label: 'Pomodoros',
      data: sessions,
      backgroundColor(c) {
        const value = c.dataset.data[c.dataIndex].v;
      const maxValue = Math.max(...sessions.map(session => session.v));
      const normalizedValue = maxValue ? value / maxValue : 0;
      const colors = [
        'rgba(0, 180, 0, 0.3)',
        'rgba(0, 180, 0, 0.5)',
        'rgba(0, 180, 0, 0.7)',
        'rgba(0, 180, 0, 0.9)'
      ];
      if (normalizedValue === 0) {
        return 'rgba(211, 211, 211, 0.5)';
      }
      let opacityIndex = Math.floor(normalizedValue * (colors.length - 1));
      return colors[opacityIndex];
      },
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 1,
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