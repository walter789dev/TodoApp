import { Router } from "express";
import {
  getBacklog,
  createBacklog,
  addTaskToBacklog,
} from "../controllers/backlogController.js";

const backlogRouter = Router();

backlogRouter.get("/", getBacklog);
backlogRouter.post("/", createBacklog);
backlogRouter.put("/add-task/:taskId", addTaskToBacklog);

export default backlogRouter;
