const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db/db");
const taskModel = require("./src/models/task");

connectDB();
const app = express();
const PORT = 5001;

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
