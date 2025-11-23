import { Request ,Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";

export const signUp = async (req : Request , res : Response)=>{
  try{
    const {userName ,name , email , password} = req.body;

    if(!userName || !email || !password || !name){
      return res.status(401).json({
        message : "Something Went Wrong"
      });
    }

    const foundUser = await userModel.findOne({email});

    if(foundUser){
      return res.status(300).json({
        message : "Already have account" 
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const user = await userModel.create({
      name , 
      userName , 
      email , 
      password : hashedPassword
    })

    if(!user){
      return res.status(401).json({
        message : "Something Went Wrong"
      })
    }

    const token = jwt.sign({email , userId : user._id} , "secure");

    res.cookie("token", token);

    return res.status(200).json({
      message : "NEW USER CREATED" ,
      user 
    })

  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}

export const signIn = async(req : Request , res : Response)=>{
  try{
    const {email , password} = req.body;

    if(!email || !password){
      return res.status(401).json({
        message : "Something " 
      })
    }
    
    const user = await userModel.findOne({email});

    const result = await bcrypt.compare(password , user?.password!);

    if(!result){
      return res.status(400).json({
        message : "You Enter invalid password"
      })
    }

    const token = jwt.sign({email  , userID : user?._id} , "secure");

    res.cookie("token", token);

    return res.status(200).json({
      message : "Successfully Signin" , 
      user
    });

  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}