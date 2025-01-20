const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db/db");
const taskModel = require("./src/models/task");

connectDB();
const app = express();
const PORT = 5001;

const { isValidObjectId } = require("mongoose");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/tasks", async (req, res) => {
  const tasks = await taskModel.find();
  res.json(tasks);
});

app.post("/create-task", async (req, res) => {
  const { status, title, description, dueDate } = req.body;
  if (!status || !title || !dueDate) {
    res
      .status(400)
      .json({ message: "Status, title and due date are required fields!" });
    return;
  }
  const task = await taskModel.create({ status, title, description, dueDate });
  res.status(201).json({ message: "Task Created Successfully", data: task });
});

app.put("/update-task", async (req, res) => {
  const { id } = req.body;
  if (!isValidObjectId) {
    res.status(400).json({ message: "Wrong MongoDB ID Is Provided!" });
    return;
  }
  const updatedTask = await taskModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedTask) {
    res.status(404).json({ message: "Task Cant Be Updated!" });
    return;
  }
  res.status(201).json(updatedTask);
});

app.delete("/delete-task", async (req, res) => {
  const { id } = req.body;
  if (!isValidObjectId) {
    res.status(400).json({ message: "Wrong MongoDB ID Is Provided!" });
    return;
  }

  const deletedTask = await taskModel.findByIdAndDelete(id);
  if (!deletedTask) {
    res.status(404).json({ message: "Task Not Found!" });
    return;
  }
  res.json(deletedTask);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
