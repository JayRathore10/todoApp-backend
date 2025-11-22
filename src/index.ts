import express from "express";
import { userRouter } from "./routes/userRoutes";
import { connectDB } from "./database/todoAppDB";
import { authRouter } from "./routes/authRoutes";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 3000;

// DB Connected 
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/auth" , authRouter);

app.listen(PORT , ()=>{
  console.log(`http://localhost:${PORT}`);
})
