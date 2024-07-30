import React, { Fragment } from "react";
import TodoApp from "../components/todo_list/TodoApp";
import TimerApp from "../components/timer/TimerApp";
import Header from "../components/Header";
import '../App.css';

function Home() {
  return (
    <Fragment>
      <Header />
      <div className="main-app">
        <TimerApp />
        <TodoApp />
      </div>
    </Fragment>
  )
}

export default Home;