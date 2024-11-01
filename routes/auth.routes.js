import { Router } from "express";
import { signUser, loginUser } from "../controllers/index.js";

export const authRouter = Router();

authRouter.post("/register", signUser);
authRouter.post("/login", loginUser);


