import { model, Schema } from "mongoose";

const backlogSchema = new Schema({
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export default model("Backlog", backlogSchema);
