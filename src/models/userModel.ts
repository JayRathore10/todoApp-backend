import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName : String , 
  name : String , 
  email : String , 
  password : String  , 
  todos : [
    {
      type : mongoose.Schema.Types.ObjectId , 
      ref : "todo"
    }
  ]
})

export const userModel = mongoose.model("user" , userSchema);

