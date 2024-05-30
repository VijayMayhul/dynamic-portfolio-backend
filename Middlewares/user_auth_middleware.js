//importing JWT for to check token
import jwt from 'jsonwebtoken';
//Importing dotenv to access environmental variables
import dotenv from 'dotenv';

//configuring .env file
dotenv.config();


//user middleware method
export const userAuthMiddleware = async (req, res, next)=>{

    // const token = req.header('Authorization');
    //getting the token from the header authorization
    const token = req.headers.authorization?.split(' ')[1];

    //checking token is missing
    if (!token) {
        return res.status(401).json({ error: "Token is missing" });
    }
    try {
        //checking the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);

        //saving the user id to request
        req.user = decoded;
        // console.log(req.user);

        //if everything fine, move to controller method
        next();
        
    } catch (error) {
        //sending error response, if any error happened
        console.log(`Error in Token : ${error}`);
        return res.status(500).json({ error: 'Invalid Token/Internal Server Error' });
    }
    
}