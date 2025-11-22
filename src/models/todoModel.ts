import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todoTask : String ,
  date : {
    type : Date, 
    default : Date.now
  }, 
  time : {
    type : Date , 
    default : Date.now
  }
});

export const todoModel = mongoose.model("todo" , todoSchema);