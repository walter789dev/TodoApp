import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    enum: ["pending", "progress", "completed"],
    default: "pending",
  },
  limitDate: {
    type: Date,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
});

export default model("Task", taskSchema);
