import { Request , Response } from "express";

export const homePage = (req : Request , res : Response)=>{
  try{
    return res.status(200).json({
      message : "HomePage"
    })
  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}