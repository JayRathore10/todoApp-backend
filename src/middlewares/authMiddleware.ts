import { Request , Response , NextFunction} from "express";
import jwt from "jsonwebtoken";
import { authRequest, userPlayload } from "../types/authRequest";

export const islogIn = (req :authRequest , res:Response , next : NextFunction )=>{
  try{
    const {token} = req.cookies;

    if(!token){
      return res.status(401).json({
        message  : "Token Not Found"
      })
    }

    const data = jwt.verify(token , "secure") as userPlayload;
    req.user = data ;
    next();
  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}