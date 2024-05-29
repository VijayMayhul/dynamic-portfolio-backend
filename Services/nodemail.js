//importing nodemailer to send mail
import nodemailer from "nodemailer";
//Importing dotenv to access environmental variables
import dotenv from "dotenv";

//configuring .env file
dotenv.config();

//mail send method
export const mail = async (userEmail, sub, body) => {
    try {

        //creating transport
        let mailTransporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MY_APP_EMAIL,
                pass: process.env.MY_EMAIL_APP_PASSWORD
            }
        });

            //setting up all details
           let details = {
                // from: "vijaysofficial369@gmail.com",
                from: `"YourPortfolio" <${process.env.MY_APP_EMAIL}>`,
                to: userEmail,
                subject: `YourPortfolio : ${sub}`,
                html: sub === 'Login' ?
                    `<p>Hello,</p>
                    <p><b><mark>You have successfully logged into YourPortfolio</mark></b>. Welcome back!</p>
                    <p>If you did not initiate this login or believe there has been unauthorized access to your account, please contact <a href="mailTo:vijaymayhul@gmail.com">
                    support</a> immediately.</p>
                    <p><i>Please don't reply to this email</i></p>
                    <p>Thank you,<br>YourPortfolio Team</p>`
                    : 
                    sub === 'Reset-Password' ?
                    `<p>Your account reset password link : <a href='${body}' target="_blank">${body}</a></p>
                    <p>It will expire within 15 minutes</p>
                    <p><i>Please don't reply to this email</i></p>
                    <p>Thank you,<br>YourPortfolio Team</p>` :
                    `
                    <p>Name : ${body.personName}</p>
                    <p>Email-ID : ${body.email}</p>
                    <p>Phone No : ${body.phoneNo}</p>
                    <p>Subject : ${body.subject}</p>
                    <p>Description : ${body.description}</p>
                    `

            };
        //sending mail
        await mailTransporter.sendMail(details);
        // console.log(`Mail Sent Successfully!`);
        return true;
    } catch (error) {
        //sending error, if any error happened
        console.log(`Mail Not Sent: ${error.message}`);
        return false;
    }
};
