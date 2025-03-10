import nodemailer from "nodemailer";

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Set this in your .env file
        pass: process.env.EMAIL_PASS  // Use App Password instead of your real password
    }
});

// Function to send emails
export const sendNotification = async (email, subject, message) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message
        });
        console.log(`✅ Email sent to ${email}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};
