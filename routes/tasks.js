import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter.get("/", getAllTask);
taskRouter.get("/:id", getTaskById);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
