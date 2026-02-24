const nodemailer = require("nodemailer");
const sendemail=async(email,subject,htmlmessage)=>{

try {
   // Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.emailuser,
    pass: process.env.passworduser,
  },
});

// Send an email using async/await
// Options for sending email
        const options = {
            from: process.env.emailuser,
            to: email,
            subject: subject,
            html: htmlmessage,
        };
// Send email
        await transporter.sendMail(options);
        console.log("Reset email sent successfully to:", email);
        return true; // Success
} catch (error) {
 console.error("errorsending email",error) 
 return false  
}

}
module.exports=sendemail