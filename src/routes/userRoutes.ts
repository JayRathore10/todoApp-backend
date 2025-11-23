import { Router } from "express";
import { deleteTodo, homePage, makeTodo, profileLogged, todoList } from "../controllers/userController";
import { isLoggedIn } from "../middlewares/authMiddleware";

export const userRouter  = Router();

userRouter.get("/" , homePage);
userRouter.get("/profile" , isLoggedIn , profileLogged);
userRouter.get("/todos" , isLoggedIn , todoList); // for reading 
userRouter.post("/add-todo" , isLoggedIn , makeTodo); // for adding 
userRouter.delete("/delete-todo/:id" , isLoggedIn  , deleteTodo); // for deleting 