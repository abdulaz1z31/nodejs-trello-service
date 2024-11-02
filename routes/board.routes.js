import { Router } from "express";
import {
    getAllBoards,
    searchBoards,
    getBoardsById,
    updateBoards,
    removeBoards,
  } from "../controllers/index.js";
export const boardRouter = Router();

boardRouter.get("/", getAllBoards);
boardRouter.get("/search", searchBoards);
boardRouter.get("/:id", getBoardsById);
boardRouter.put("/:id", updateBoards);
boardRouter.delete("/:id", removeBoards);


