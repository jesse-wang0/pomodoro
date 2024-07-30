import React, { Fragment } from "react";
import Header from "../components/Header";
import UseSessionInfo from "../components/statistics/UseSessionHook"
import BasicStatistics from "../components/statistics/BasicStatistics";
import BarChart from "../components/statistics/BarChart";
import HeatMap from "../components/statistics/HeatMap";

function Statistics() {
  const {dayCount, dayTime, weekCount, weekTime, monthCount, monthTime,
    yearCount, yearTime, weekDailyHours, yearData} = UseSessionInfo();
  const sessionData = { dayCount, dayTime, weekCount, weekTime, monthCount, monthTime, yearCount, yearTime };
  return (
    <Fragment>
      <Header />
      <BasicStatistics sessions={sessionData} />
      <BarChart sessions={weekDailyHours} />
      <HeatMap sessions={yearData} />
    </Fragment>
  )
}

export default Statistics;