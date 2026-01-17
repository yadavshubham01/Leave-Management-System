import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  
  try {
    const { email, firstName, lastName, password, role } = req.body;
    if (!email || !password || !firstName || !lastName || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      firstName,
      lastName,
      password:passwordHash,
      role,
    });

    const token = jwt.sign(
        {userId: user._id,role:user.role},
        process.env.JWT_SECRET,
        { expiresIn: '1d'}
    );

   const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User successfully registered",
      token,
      user:userResponse,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async(req,res) => {
    try{ 
     const { email,password} = req.body;
     if(!email || !password){
        return res.status(400).json({ message: "All fields are required" });
     } 
     const user = await User.findOne({email});
     if(!user){
        return res.status(400).json({ message: "Invalid credentials" });
     }

     const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch){
        return res.status(400).json({ message: "Invalid credentials" });
     }

     const token = jwt.sign(
        {userId: user._id,role:user.role},
        process.env.JWT_SECRET,
        { expiresIn: '1d'}
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
        message: "User successfully login",
      token,
      user: userResponse,
    })

    }catch(error){
        console.error("Register Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}