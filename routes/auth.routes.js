import { Router } from "express";
import { signUser, loginUser } from "../controllers/index.js";

const authRouter = Router();

authRouter.post("/register", signUser);
authRouter.post("/login", loginUser);

export default authRouter
