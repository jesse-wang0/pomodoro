import React, { Fragment, useState, useEffect } from "react";
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";

function TodoApp() {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
      try {
        const response = await fetch("http://localhost:5000/todos");
        const todosArray = await response.json();
        setTodos(todosArray);
      } catch (err) {
        console.error(err.message);
      }
    };

    const deleteTodo = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/todos/${id}`, {
          method: "DELETE"
        });
        console.log(response)
        setTodos(todos.filter(todo => todo.todo_id !== id));
      } catch (err) {
        console.log(err.message);
      }
    };
  
    useEffect(() => {
      getTodos();
    }, []);
  
    return (
      <Fragment>
        <InputTodo refreshTodos={getTodos} />
        <ListTodos todos={todos} deleteTodo={deleteTodo} refreshTodos={getTodos}/>
      </Fragment>
    );
  }
  
  export default TodoApp;