import { model, Schema } from "mongoose";

const sprintSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  color: {
    type: String,
    default: "",
  },
});

export default model("Sprint", sprintSchema);
