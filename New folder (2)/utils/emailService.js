import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


export const sendVerificationEmail = (email, code) => {
    const verificationUrl = `http://localhost:5000/verify/${code}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your account',
        html: `<p>Click <a href="${verificationUrl}">here</a> to verify your account.</p>`,
    };

    return transporter.sendMail(mailOptions);
};
