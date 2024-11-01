import { Router } from "express";
import {
    getAllData,
    searchData,
    getById,
    updateData,
    removeData,
  } from "../controllers/index.js";
export const boardRouter = Router();

boardRouter.get("/", getAllData);
boardRouter.get("/search", searchData);
boardRouter.get("/:id", getById);
boardRouter.put("/:id", updateData);
boardRouter.delete("/:id", removeData);


