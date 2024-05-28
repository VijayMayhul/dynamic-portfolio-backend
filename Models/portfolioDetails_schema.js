//importing mongoose to create schema
import mongoose from "mongoose";

//defining portfolio schema
const portfolioDetailsSchema = new mongoose.Schema({
    template: {
        type: String,
        required: true
    },
    home: {
        welcomeText: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        shortIntro: {
            type: String,
            required: true
        },
    },
    about: {
        briefIntro: {
            type: String,
            required: true
        },
        resumeUrl: String,
    },
    skills: [{
        type: String,
        required: true
    }],
    workExperience: [{
        from: {
            type: Date,
            required: true
        },
        to: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        location : {
            type: String,
            required: true
        },
        workDetails: {
            type: String,
            required: true
        }
    }],
    education: [{
        from: {
            type: Date,
            required: true
        },
        to: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        courseName: {
            type: String,
            required: true
        },
        institutionName: {
            type: String,
            required: true
        },
        location:{
            type: String,
            required: true
        },
        courseInfo: String,
    }],
    projects: [{
        projectName: {
            type: String,
            required: true
        },
        techUsed: [{
            type: String,
        }],
        projectDetails: {
            type: String,
            required: true
        },
        projectLink:String,
        
    }],
    contact: {
        phoneNo: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true
        },
        socialMedia: {
            linkedinUrl: String,
            githubUrl: String,
            telegramUrl: String,
            facebookUrl: String,
            instagramUrl: String
        }
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});

//creating model for portfolio
const PortfolioDetails = mongoose.model('PortfolioDetails', portfolioDetailsSchema);

//exporting the portfolio model
export default PortfolioDetails;
