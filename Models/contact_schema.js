//importing mongoose to create schema
import mongoose from "mongoose";


//defining contact schema
const contactedDataSchema = mongoose.Schema({
    personName : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phoneNo : {
        type: String,
        required: true
    },
    subject : {
        type: String,
        required: true
    },
    description : {
        type: mongoose.Schema.Types.String,
        required: true
    },
    resolved : {
        type : Boolean,
        default : false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});


//creating model for contact
const ContactedData = mongoose.model("ContactedData", contactedDataSchema);

//exporting the contact model
export default ContactedData;