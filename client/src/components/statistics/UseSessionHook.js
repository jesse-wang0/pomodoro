import { useState, useEffect } from "react";
import './Statistics.css';

function UseSessionInfo() {
  const [dayCount, setDayCount] = useState();
  const [dayTime, setDayTime] = useState();
  const [weekCount, setWeekCount] = useState();
  const [weekTime, setWeekTime] = useState();
  const [monthCount, setMonthCount] = useState();
  const [monthTime, setMonthTime] = useState();
  const [yearCount, setYearCount] = useState();
  const [yearTime, setYearTime] = useState();
  const [weekDailyHours, setWeekDailyHours] = useState([]);
  const [yearData, setYearData] = useState(generateData());

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  

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
        v: 0
      });
      dt = new Date(dt.setDate(dt.getDate() + 1));
    }
    return data;
  }

  const getSessions = async () => {
    try {
      const dayResponse = await fetch("http://localhost:5000/test/day");
      const dayArray = await dayResponse.json();
      setDayCount(dayArray.length);

      let dayTimeSum = 0;
      for (let i = 0; i < dayArray.length; i++) {
        dayTimeSum += dayArray[i].duration;
      }
      setDayTime(Math.round(dayTimeSum / 60 * 100) / 100);

      const weekResponse = await fetch("http://localhost:5000/test/week");
      const weekArray = await weekResponse.json();
      setWeekCount(weekArray.length);

      const dailyHours = {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0,
      };
      let weekTimeSum = 0;
      for (let i = 0; i < weekArray.length; i++) {
        const session = weekArray[i];
        let day = weekday[new Date(session.end_time).getDay()];
        dailyHours[day] += Math.round(session.duration / 60 * 100) / 100;
        weekTimeSum += session.duration;
      }
      setWeekTime(Math.round(weekTimeSum / 60 * 100) / 100);
      setWeekDailyHours(dailyHours)

      const monthResponse = await fetch("http://localhost:5000/test/month");
      const monthArray = await monthResponse.json();
      setMonthCount(monthArray.length);

      let monthTimeSum = 0;
      for (let i = 0; i < monthArray.length; i++) {
        monthTimeSum += monthArray[i].duration;
      }
      setMonthTime(Math.round(monthTimeSum / 60 * 100) / 100);

      const yearResponse = await fetch("http://localhost:5000/test/year");
      const yearArray = await yearResponse.json();
      setYearCount(yearArray.length);

      let yearTimeSum = 0;
      const updatedYearData = structuredClone(yearData)
      for (let i = 0; i < yearArray.length; i++) {
        const yearSession = yearArray[i]
        const yearSessionLength = yearSession.duration
        yearTimeSum += yearSessionLength;

        const dateStr = new Date(yearSession.end_time).toISOString().substring(0, 10);
        const index = updatedYearData.findIndex(item => item.x === dateStr);
        if (index !== -1) {
          updatedYearData[index].v += Math.round(yearSession.duration / 60 * 100) / 100;
        }
      }
      setYearData(updatedYearData);
      setYearTime(Math.round(yearTimeSum / 60 * 100) / 100);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  return {
    dayCount, dayTime, weekCount, weekTime, monthCount, monthTime,
    yearCount, yearTime, weekDailyHours, yearData
  };
}

export default UseSessionInfo;