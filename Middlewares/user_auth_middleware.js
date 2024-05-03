import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const userAuthMiddleware = async (req, res, next)=>{

    // const token = req.header('Authorization');
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        req.user = decoded;
        // console.log(req.user);
        next();
        
    } catch (error) {
        console.log(`Error in Token : ${error}`);
        return res.status(500).json({ error: 'Invalid Token/Internal Server Error' });
    }
    
}