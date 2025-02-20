// import * as nodemailer from "nodemailer";

// export class EmailService {
//     private transporter: nodemailer.Transporter;

//     constructor() {
//         // Create a transporter object using the default SMTP transport
//         this.transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com', // SMTP server address
//             port: 587, // SMTP server port
//             secure: false, // Use TLS
//             auth: {
//                 user: process.env.EMAIL_ID, // Your email
//                 pass: process.env.PASSWORD_EMAIL, // Your email password or app password
//             },
//         });
//     }

//     async sendEmail({to, subject, text}: {to: string; subject: string; text: string;}): Promise<void> {
//         try {
//             console.log("Sending email...");
//             console.log(to, subject, text, "Arguments passed to sendEmail function");

//             // Send the email
//             await this.transporter.sendMail({
//                 from: 'mhdmuflihkk@gmail.com', // Sender email
//                 to: to, // Recipient email
//                 subject: subject, // Subject
//                 text: text, // Body
//             });

//             console.log(`Email successfully sent to ${to}`);
//         } catch (error) {
//             console.error("Failed to send email:", error);
//             throw new Error("Failed to send email");
//         }
//     }
// }


import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

// Create and configure the transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Set to true for port 465
    auth: {
        user: "mhdmuflihkk@gmail.com",
        pass: "tnmy fzxf csvk brya",
    },
});


// Function to send email with OTP passed as a parameter
export async function sendEmail({ to, subject, otp, }: { to: string; subject: string; otp: number; }): Promise<void> {
    try {
        console.log(`Sending email to ${to} with subject "${subject}" and OTP: ${otp}`);

        await transporter.sendMail({
            from: process.env.EMAIL_ID, // Use email from environment variables
            to: to, // Recipient email
            subject: subject, // Email subject
            text: `Your OTP is: ${otp}`, // Email body
        });

        console.log(`Email successfully sent to ${to}`);
    } catch (error: any) {
        console.error('Error while sending email:', error.message);
        throw new Error('Failed to send email. Please check the configuration.');
    }
}
