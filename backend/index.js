const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Mongo Connect
mongoose.connect(process.env.MONGO_URL);
// Schema
const Todo = mongoose.model("Todo", {
  text: String,
  completed: { type: Boolean, default: false }
});

// GET all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ADD todo
app.post("/add", async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

// DELETE todo
app.delete("/delete/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// TOGGLE complete
app.put("/toggle/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Backend running");
});