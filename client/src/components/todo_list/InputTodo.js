import React, { Fragment, useState } from "react";
import './Todo.css';

const InputTodo = ({ refreshTodos }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response);
      refreshTodos();
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <Fragment>
      <h2 className="text-center my-5">To-do List</h2>
      <form className="input-box d-flex mb-4" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Add todo"
          className="form-control mx-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;