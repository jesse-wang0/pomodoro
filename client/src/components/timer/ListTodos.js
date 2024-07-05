import React, { Fragment, useEffect, useState } from "react";

const ListTodos = () => {

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

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table class="table">
        <thead>
          <tr>
            <th>Todo</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td><button>Edit</button></td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Fragment>

  )
}

export default ListTodos;