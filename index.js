import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './Databases/db_config.js';
import userRouter from './Routers/user_router.js';

dotenv.config();

const app = express();
const port = process.env.MYPORT;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/', userRouter)

app.listen(port,()=>{
    console.log(`Server is running in the port : ${port}`);
});