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
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
});

module.exports = mongoose.model("tasks", taskSchema);
