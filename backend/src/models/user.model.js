import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{type: String,required:true},
    firstName:{type: String,required:true},
    lastName:{type: String,required:true},
    password:{type: String,required:true},
    role:{type:String, enum:["Employee","Manager"], required:true},
    leaveBalance: {
    vacation: { type: Number, default: 20 },
    sick: { type: Number, default: 10 }
  }
},{timestamps:true});

export const User = mongoose.model("User",UserSchema); 