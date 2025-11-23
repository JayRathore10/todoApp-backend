import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface userPlayload extends JwtPayload{
  userId : any , 
  email : String 
}

export interface authRequest extends Request{
  user ?: userPlayload
}