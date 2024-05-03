import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
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
        validate: {
            validator: function(value) {
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: props => `${props.value} is not a valid email address`
        }
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

const User = mongoose.model('User', userSchema);

export default User;
