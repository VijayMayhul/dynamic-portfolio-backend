import User from "../Models/user_schema.js";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { mail } from "../Services/nodemail.js";
import PortfolioDetails from "../Models/portfolioDetails_schema.js";

dotenv.config();

export const registerUser = async (req, res)=>{
    try {

        const {userName, dateOfBirth, email, password} = req.body;

        if(!userName || !dateOfBirth || !email || !password){
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address.' });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: 'An account with this email already exists. Please use a different email.' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        // console.log(`Hash Password : ${hashPassword}`);

        const newUser = new User({userName, email, dateOfBirth, password:hashPassword});
        await newUser.save();

        res.status(201).json({message:"You Registered Successfully!", userData : newUser});

    } catch (error) {
        console.log(`Error while registering : ${error}`);
        res.status(500).json({error : `Registeration Failed, Internal Server Error`});
    }
}

export const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address.' });
        }

        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({message : 'User Not Found!'});
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.status(400).json({message : 'Invalid Password!'});
        }
        
        const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET, {expiresIn : "1h"});

        mail(user.email, 'Login');

        res.status(200).json({message : 'Login Successful!', token: token});

    } catch (error) {
        console.log(`Error while login : ${error}`);
        res.status(500).json({error : `Login Failed, Internal Server Error`});
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const resetPasswordUrl = `${process.env.FRONT_END_BASE_URL}/reset-password?token=${token}`;

        const mailSent = await mail(user.email, 'Reset-Password', resetPasswordUrl);

        if (mailSent) {
            return res.status(200).json({ success: true, message: 'The password reset link has been sent to the provided email address.', token: token });
        } else {
            throw new Error('Failed to send email.');
        }
    } catch (error) {
        console.error(`Error in forgotPassword: ${error.message}`);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error(`Error in resetPassword: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getUserHome = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User data found!', userData: user });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const createPortfolio = async (req, res) => {
    try {
        const userId = req.user._id;
        const { template, home, about, skills, workExperience, education, projects, contact } = req.body;

        // Validate required fields
        if (!template || !home || !about || !skills || !workExperience || !education || !projects || !contact) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create portfolio details object
        const portfolioInfo = new PortfolioDetails({
            template,
            home,
            about,
            skills,
            workExperience,
            education,
            projects,
            contact,
            user_id: userId
        });

        // Validate against schema
        const validationError = portfolioInfo.validateSync();
        if (validationError) {
            return res.status(400).json({ error: validationError.message });
        }

        // Save to database
        await portfolioInfo.save();

        const user = await User.findById(userId);
        user.portfolio_id = portfolioInfo._id;
        await user.save();

        return res.status(201).json({ message: 'Portfolio Data Added Successfully', data: portfolioInfo });
    } catch (error) {
        console.error(`Error in adding Portfolio Info: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updatePortfolio = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { template, home, about, skills, workExperience, education, projects, contact } = req.body;

        // Validate required fields
        if (!template || !home || !about || !skills || !workExperience || !education || !projects || !contact) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const portfolio = await PortfolioDetails.findById(user.portfolio_id);

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        // Update portfolio details
        portfolio.template = template;
        portfolio.home = home;
        portfolio.about = about;
        portfolio.skills = skills;
        portfolio.workExperience = workExperience;
        portfolio.education = education;
        portfolio.projects = projects;
        portfolio.contact = contact;

        await portfolio.save();

        return res.status(200).json({ message: 'Portfolio Data Updated Successfully', data: portfolio });
    } catch (error) {
        console.error(`Error in Updating Portfolio Info: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deletePortfolio = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const portfolioId = user?.portfolio_id;
        if (!portfolioId) {
            return res.status(404).json({ error: 'Portfolio not found for this user' });
        }

        const portfolio = await PortfolioDetails.findByIdAndDelete(user.portfolio_id);

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        user.portfolio_id = null;
        await user.save();

        return res.status(200).json({ message: 'Portfolio Data Deleted Successfully', data: portfolio });

    } catch (error) {
        console.error(`Error in Deleting Portfolio Data: ${error.message}`);
        return res.status(500).json({ error: 'Failed to delete portfolio data. Please try again later.' });
    }
}

export const getUserPortfolio = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const portfolioId = user?.portfolio_id;
        if (!portfolioId) {
            return res.status(404).json({ error: 'Portfolio not found for this user' });
        }

        const portfolio = await PortfolioDetails.findById(user.portfolio_id);

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        return res.status(200).json({ message: 'Portfolio Data Fetched Successfully', data: portfolio });

    } catch (error) {
        console.error(`Error in Getting Portfolio Data: ${error.message}`);
        return res.status(500).json({ error: 'Failed to fetch portfolio data. Please try again later.' });
    }
}