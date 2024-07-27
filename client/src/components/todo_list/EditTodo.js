import React, { Fragment, useState } from "react";

const EditTodo = ({ todo, refreshTodos }) => {
  const [description, setDescription] = useState(todo.description);

  const editText = async (id) => {
    try {
      const body = { description };
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
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
      <button type="button" className="btn btn-warning" data-bs-toggle="modal" 
        data-bs-target={`#id${todo.todo_id}`}> Edit </button>
      
      <div className="modal fade" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Todo</h5>
              <button type="button" className="btn-close" 
              data-bs-dismiss="modal" aria-label="Close" 
              onClick={() => setDescription(todo.description)}>
              </button>
            </div>
            <div className="modal-body">
            <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" 
              data-bs-dismiss="modal" 
              onClick={() => setDescription(todo.description)}>Close
              </button>
              <button type="button" className="btn btn-warning" 
              data-bs-dismiss="modal" 
              onClick={() => editText(todo.todo_id)}>Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;