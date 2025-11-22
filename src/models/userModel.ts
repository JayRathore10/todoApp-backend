import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName : String , 
  name : String , 
  email : String , 
  password : String 
})

export const userModel = mongoose.model("user" , userSchema);
