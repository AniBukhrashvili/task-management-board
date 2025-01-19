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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
