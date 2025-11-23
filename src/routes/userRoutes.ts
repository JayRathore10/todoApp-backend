import { Router } from "express";
import { homePage, makeTodo, profileLogged, todoList } from "../controllers/userController";
import { isLoggedIn } from "../middlewares/authMiddleware";

export const userRouter  = Router();

userRouter.get("/" , homePage);
userRouter.get("/profile" , isLoggedIn , profileLogged);
userRouter.get("/todo" , isLoggedIn , todoList);
userRouter.post("/add-todo" , isLoggedIn , makeTodo);