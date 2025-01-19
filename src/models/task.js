const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desciption: String,
    dueDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", taskSchema);
