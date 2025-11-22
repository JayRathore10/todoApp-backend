import { Router } from "express";
import { homePage } from "../controllers/userController";

export const userRouter  = Router();

userRouter.get("/" , homePage);