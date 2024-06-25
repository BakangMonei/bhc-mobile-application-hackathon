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
      from: "BHC Application - Monei Bakang [Testing]",
      to: data.email,
      subject: "Application Received",
      text: `Hello ${data.name},
      \nYour application for the property ${data.propertyId} has been received.
      
      Phone: ${data.phone}
      Message: ${data.message}
      Property ID: ${data.propertyId}
      Status: ${data.status}
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

const generateOtp = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

export const sendOtpEmail = functions.https.onCall(async (data, context) => {
  const email = data.email;
  const otp = generateOtp();

  const mailOptions = {
    from: "BHC Application - Monei Bakang [Testing]",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully ${otp}");
    return {success: true, otp}; // Return OTP for verification purposes
  } catch (error: any) {
    console.error("Error sending OTP email:", error);
    throw new functions.https.HttpsError("unknown", error.message, error);
  }
});
