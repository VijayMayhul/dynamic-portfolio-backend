import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const mail = async (userEmail, sub, url) => {
    try {
        let mailTransporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "vijaysofficial369@gmail.com",
                pass: process.env.MY_EMAIL_APP_PASSWORD
            }
        });

        let details = {
            // from: "vijaysofficial369@gmail.com",
            from: '"YourPortfolio" <vijaysofficial369@gmail.com>',
            to: userEmail,
            subject: `YourPortfolio : ${sub === 'Login' ? "Login" : "Reset-Password"}`,
            html: sub === 'Login' ?
                `<p>Hello,</p>
                <p><b><mark>You have successfully logged into YourPortfolio</mark></b>. Welcome back!</p>
                <p>If you did not initiate this login or believe there has been unauthorized access to your account, please contact support immediately.</p>
                <p><i>Please don't reply to this email</i></p>
                <p>Thank you,<br>YourPortfolio Team</p>`
                :
                `<p>Your account reset password link : <a href='${url}' target="_blank">${url}</a></p>
                <p>It will expire within 15 minutes</p>
                <p><i>Please don't reply to this email</i></p>
                <p>Thank you,<br>YourPortfolio Team</p>`
        };
        
        

        await mailTransporter.sendMail(details);
        console.log(`Mail Sent Successfully!`);
        return true;
    } catch (error) {
        console.log(`Mail Not Sent: ${error.message}`);
        return false;
    }
};
