const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  dueDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tasks", taskSchema);
