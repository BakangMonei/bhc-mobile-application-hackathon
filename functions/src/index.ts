import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bakangmonei2@gmail.com",
    pass: "ooecgothgtofixdk",
  },
});

export const sendEmailNotification = functions.firestore
  .document("applications/{applicationId}")
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    const mailOptions = {
      from: "bakangmonei2@gmail.com",
      to: data.email,
      subject: "Application Received",
      text: `Hello ${data.username},\n
      \nYour application for the 
      property ${data.propertyId} 
      has been received. 
      We will get back to you soon.
      \n\nBest regards,
      \nThe BHC Team`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });
