import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.MONGODBCONNECTIONSTRING;

export const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(mongoUrl);
        console.log(`Atlas Mongodb connected!`);
        return connection;
    } catch (error) {
        console.log(`Error : ${error}`);
    }
}