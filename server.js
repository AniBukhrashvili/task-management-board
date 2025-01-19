const express = require("express");
const app = express();

const PORT = 5001;

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "express message" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
