// import dotenv from "dotenv";
// import nodemailer from "nodemailer";
// //import { config } from "../../../configurations/config.variables"
// export class landlordEmail {
//   public signupMail = async (options) => {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: "aliuphilip13@gmail.com",
//       to: options.email,
//       subject: options.subject,
//       text: options.text,
//     };

//     await transporter.signupMail(mailOptions);
//   };
// }
