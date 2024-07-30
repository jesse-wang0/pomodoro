import React, { Fragment } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ todos, deleteTodo, refreshTodos }) => {
  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Tasks</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td><EditTodo todo={todo} refreshTodos={refreshTodos} /></td>
                <td><button className="btn btn-danger" onClick={() =>
                  deleteTodo(todo.todo_id)}>Delete</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;