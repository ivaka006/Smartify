import mongoose, { connect } from "mongoose"
import dotenv from "dotenv"

export const connctDB = async () => {
    
    try{     
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to db succesfully")
    }
    catch(error){
        console.error("Error conncting db", error);
        process.exit(1) // exit with failure 
    }
} 