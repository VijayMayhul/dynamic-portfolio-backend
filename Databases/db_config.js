//importing mongoose to connect with dbs
import mongoose from "mongoose";
//Importing dotenv to access environmental variables
import dotenv from 'dotenv';
//configuring .env file
dotenv.config();

//storing the connection string
const mongoUrl = process.env.MONGODBCONNECTIONSTRING;


//connect with dbs using mongoose
export const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(mongoUrl);
        console.log(`Atlas Mongodb connected!`);
        return connection;
    } catch (error) {
        console.log(`Error : ${error}`);
    }
}