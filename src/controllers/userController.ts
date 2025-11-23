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
// Read 
export const todoList = async (req : authRequest ,res : Response)=>{
  try{
    const user = await userModel.findOne({email : req.user?.email}).populate("todos");
    
    if(!user){
      return res.status(401).json({
        message : "Something went wrong" 
      })
    }

    const todos = await todoModel.findOne({userId : user?._id});

    return res.status(200).json({
      message : "All Todos" , 
      todos : user?.todos
    })

  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}


// making a todo 
// Create 
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

// Update is add later 

export const deleteTodo = async (req : authRequest , res :Response)=>{
  try{
    const user = await userModel.findOne({email : req.user?.email}).populate("todos");

    if(!user){
      return res.status(401).json({
        message : "Something went wrong" 
      })
    }

    const {id} = req.params;
    const todo = await todoModel.findOneAndDelete({_id : id});

    return res.status(200).json({
      message : "Deleted Successfully" , 
      todo : todo , 
      todos : user?.todos
    })

  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}