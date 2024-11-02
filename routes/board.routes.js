import { Router } from "express";
import {
    getAllBoards,
    searchBoards,
    getBoardsById,
    updateBoards,
    removeBoards,
    getAllTasks,
    updateTasks,
    removeTasks,
    getTasksById,
    createTask
  } from "../controllers/index.js";

const boardRouter = Router();


boardRouter.get("/:boardId/tasks", getAllTasks);
boardRouter.post("/:boardId/tasks", createTask);
boardRouter.get("/:boardId/tasks/:id", getTasksById);
boardRouter.put("/:boardId/tasks/:id", updateTasks);
boardRouter.delete("/:boardId/tasks/:id", removeTasks);


boardRouter.get("/", getAllBoards);
boardRouter.get("/search", searchBoards);
boardRouter.get("/:id", getBoardsById);
boardRouter.put("/:id", updateBoards);
boardRouter.delete("/:id", removeBoards);



export default boardRouter

