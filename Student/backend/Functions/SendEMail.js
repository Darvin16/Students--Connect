import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

//clint id and secret are passed to google to get authuntication code which is used to get tokens(refresh,access)
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" //callback url where authuntication code passed to get tokens
);

//set refresh token so it can generate new access token if existing one expires
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

export default async function sendEMail({ to, subject, text }) {
  try {
    //get access token using refresh token
    const accessToken = await oauth2Client.getAccessToken();
    if (!accessToken || !accessToken.token) {
      console.log("Failed to retrieve access token");
      throw new Error("Failed to retrieve access token");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_ID,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `"SRM University" <${process.env.MAIL_ID}>`, //'"Name of Mail" <Mail_ID>'
      to: to,
      subject: subject,
      text: text,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          reject(error); //reject promise and throw error to catched by catch() block
        } else {
          // console.log(info);
          resolve(info); //resolve promise and pass the info to then() block, so the data could be used by the caller
        }
      });
    });
  } catch (error) {
    console.log(error);
    throw error; // will also pass error to catch() block and reject promise
  }
}
