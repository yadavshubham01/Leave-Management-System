import mongoose from "mongoose";

const ConnetDB = async() => {
   try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Connected");
   }catch(error){
     console.error("failed to connect DB", error);
     process.exit(1);
   }
};

export default ConnetDB;