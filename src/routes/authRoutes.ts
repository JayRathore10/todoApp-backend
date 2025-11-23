import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";

export const authRouter = Router();

authRouter.post("/signup" , signUp);
authRouter.post("/signin" , signIn);