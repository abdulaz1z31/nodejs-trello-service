import { Router } from "express";
import {
  getAllData,
  searchData,
  getById,
  updateData,
  removeData,
} from "../controllers/index.js";
export const userRouter = Router();

userRouter.get("/", getAllData);
userRouter.get("/search", searchData);
userRouter.get("/:id", getById);
userRouter.put("/:id", updateData);
userRouter.delete("/:id", removeData);

