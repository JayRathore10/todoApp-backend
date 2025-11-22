import mongoose from 'mongoose';

export const connectDB = async ()=>{
  try{
    mongoose.connect(`mongodb://localhost:27017/todoAppDB`);
    console.log(`DB Connected`);
  }catch(err){
    console.log(err);
  }
}