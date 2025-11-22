import { Router } from "express";
import { signUp } from "../controllers/authController";

export const authRouter = Router();

authRouter.get("/signup" , signUp);