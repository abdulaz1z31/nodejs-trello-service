import { Router } from "express";
import {
    getAllData,
    searchData,
    getById,
    updateData,
    removeData,
  } from "../controllers/index.js";
export const taskRouter = Router();

taskRouter.get("/", getAllData);
taskRouter.get("/search", searchData);
taskRouter.get("/:id", getById);
taskRouter.put("/:id", updateData);
taskRouter.delete("/:id", removeData);

