import { Router } from "express";
import { getBacklog, createBacklog } from "../controllers/backlogController.js";

const backlogRouter = Router();

backlogRouter.get("/", getBacklog);
backlogRouter.post("/", createBacklog);

export default backlogRouter;
