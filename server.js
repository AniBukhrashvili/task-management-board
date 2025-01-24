const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db/db");
const taskModel = require("./src/models/task");
const userModel = require("./src/models/user");

connectDB();
const app = express();
const PORT = 8000;

const { isValidObjectId } = require("mongoose");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed To Fetch Tasks", error });
  }
});

app.post("/create-task", async (req, res) => {
  const { status, title, description, dueDate, assignedTo } = req.body;
  if (!status || !title || !dueDate) {
    res
      .status(400)
      .json({ message: "Status, title and due date are required fields!" });
    return;
  }

  if (assignedTo && !isValidObjectId(assignedTo)) {
    res.status(400).json({ message: "Invalid user ID for task assignment" });
    return;
  }

  try {
    const task = await taskModel.create({
      status,
      title,
      description,
      dueDate,
      assignedTo,
    });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed To Create Task", error });
  }
});

app.put("/update-task/:id", async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
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

app.delete("/delete-task/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Wrong MongoDB ID Is Provided!" });
    return;
  }

  const deletedTask = await taskModel.findByIdAndDelete(id);
  if (!deletedTask) {
    res.status(404).json({ message: "Task Not Found!" });
    return;
  }
  res.status(200).json(deletedTask);
});

app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({}, "name");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed To Fetch Users", error });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error Fetching User:", error);
    res.status(500).json({ message: "Failed To Fetch User", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
