import { Router } from "express";
import {
    getAllTasks,
    searchTasks,
    updateTasks,
    removeTasks,
    getTasksById,
  } from "../controllers/index.js";
export const taskRouter = Router();

taskRouter.get("/", getAllTasks);
taskRouter.get("/search", searchTasks);
taskRouter.get("/:id", getTasksById);
taskRouter.put("/:id", updateTasks);
taskRouter.delete("/:id", removeTasks);

