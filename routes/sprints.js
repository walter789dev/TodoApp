import { Router } from "express";
import {
  createSprint,
  deleteSprint,
  getAllSprint,
  getSprintById,
  updateSprint,
} from "../controllers/sprintController.js";

const sprintRouter = Router();

sprintRouter.get("/", getAllSprint);
sprintRouter.get("/:id", getSprintById);
sprintRouter.post("/", createSprint);
sprintRouter.put("/:id", updateSprint);
sprintRouter.delete("/:id", deleteSprint);

export default sprintRouter;
