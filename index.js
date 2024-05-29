//Importing express to create server
import express from 'express';

//Importing cors for cross platform verification
import cors from 'cors';

//Importing dotenv to access environmental variables
import dotenv from 'dotenv';

//Importing mongoDB connect function
import { connectDB } from './Databases/db_config.js';

//Importing user Router
import userRouter from './Routers/user_router.js';


//configuring .env file
dotenv.config();


//creating server
const app = express();
//Giving port number to server
const port = process.env.MYPORT;


//defining which domain to use our server
app.use(cors({ origin: process.env.FRONT_END_BASE_URL }));
// app.use(cors());
// console.log('FRONT_END_BASE_URL:', process.env.FRONT_END_BASE_URL);

//parsing json body values
app.use(express.json());

//calling connectdb to connect dbs
connectDB();


//Initialize routing
app.use('/', userRouter)


//Listening to the server Port
app.listen(port,()=>{
    console.log(`Server is running in the port : ${port}`);
});