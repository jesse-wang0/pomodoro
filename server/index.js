const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create study session
app.post("/test", async (req, res) => {
  try {
    const { duration, end_time } = req.body;
    const newSession = await pool.query(
      "INSERT INTO test (duration, end_time) VALUES ($1, $2) RETURNING *",
      [duration, end_time]);
    res.json(newSession.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

//get study session 

//get study session today, this week, this month relative to today.
app.get("/test/:period", async (req, res) => {
  const currentDate = new Date(Date.now());
  try {
    let query = '';
    let values = [currentDate];
    const { period } = req.params;
    switch (period) {
      case 'day':
        query = 'SELECT * FROM test WHERE EXTRACT(DAY FROM end_time::date) = EXTRACT(DAY FROM $1::date) \
                                          AND EXTRACT(MONTH FROM end_time::date) = EXTRACT(MONTH FROM $1::date) \
                                          AND EXTRACT(YEAR FROM end_time::date) = EXTRACT(YEAR FROM $1::date)';
        break;
      case 'week':
        // STILL BROKEN
        query = "SELECT * FROM test WHERE end_time >= DATE_TRUNC('week', $1::date) \
                                      AND end_time < DATE_TRUNC('week', $1::date) + interval '1 week';";
        break;
      case 'month':
        query = 'SELECT * FROM test WHERE EXTRACT(MONTH FROM end_time::date) = EXTRACT(MONTH FROM $1::date) \
                                          AND EXTRACT(YEAR FROM end_time::date) = EXTRACT(YEAR FROM $1::date)';
        break;
      default:
        return res.status(400).json({ error: `Invalid period parameter`});
    }
    const sessions = await pool.query(query, values);
    res.json(sessions.rows);
  } catch (err) {
    console.error(err.message);
  }
})

//create todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
})

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

//update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
})

//delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was deleted");
  } catch (err) {
    console.log(err.message);
  }
})

app.listen(5000, () => {
  console.log("server has started on port 5000")
});