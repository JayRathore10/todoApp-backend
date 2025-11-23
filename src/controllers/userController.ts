import { Request , Response } from "express";
import { authRequest } from '../types/authRequest';
import { userModel } from "../models/userModel";
import { todoModel } from "../models/todoModel";

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

export const profileLogged = async (req : authRequest , res : Response)=>{
  try{
    const user = await userModel.findOne({email : req.user?.email});

    if(!user){
      return res.status(400).json({
        message : "Something went wrong"
      })
    }

    return res.status(200).json({
      message : "Welcome" , 
      user 
    })

  }catch(err){
      return res.status(500).json({
      messsage : err
    })
  }
}

// shows the list of todos 
export const todoList = async (req : authRequest ,res : Response)=>{
  try{
    
  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}


// making a todo 
export const makeTodo = async (req : authRequest, res : Response)=>{
  try{
    const user = await userModel.findOne({email : req.user?.email});
    
    const {todoTask} = req.body;

    if(!user){
      return res.status(401).json({
        message : "Not Found"
      })
    }

    const todo = await  todoModel.create({
      todoTask , 
      user : user._id
    })    

    user?.todos.push(todo?._id);
    await user.save();
    return res.status(200).json({
      message : "Todo Added" , 
      todoTask
    })

  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}