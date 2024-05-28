//importing mongoose to create schema
import mongoose from "mongoose";

//defining user schema
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    dateOfBirth : {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true
    },
    portfolio_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'PortfolioDetails',
        default : null
    }
});

//creating model for user
const User = mongoose.model('User', userSchema);

//exporting the user model
export default User;
