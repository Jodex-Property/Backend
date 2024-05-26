// import { config } from "../../../configurations/config";
// import { options } from "apicache";
// import nodemailer from "nodemailer";
// // import transporter from "../../../configurations/transporter";
// // import { InternalServerError } from "../../../errors/internalServerError";

// const SendEmails = (options) => {
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: config.EMAIL_USERNAME,
//       pass: config.EMAIL_PASSWORD,
//     },
//   });
// };

// //   public blastSchoolVerificationTokenMessage = async (data: any) => {
// //     const mailTransporter = transporter();
// //     try {
// //       await sendEmail({
// //         template: "school-otp",
// //         context: {
// //           ...data,
// //         },
// //         to: data.email,
// //         from: "guident.team@gmail.com",
// //         subject: "Email verification token",
// //         transporter: mailTransporter,
// //       });
// //     } catch (error: any) {
// //       console.error(error);
// //       throw new InternalServerError(error.message);
// //     }
// //   };
// //   public sendLandlordRegistrationMessage = async (data: any) => {
// //     const mailTransporter = transporter();
// //     try {
// //       await sendEmail({
// //         template: "register-landlord",
// //         context: {
// //           ...data,
// //         },
// //         to: data.email,
// //         from: "folaremidixon@gmail.com",
// //         subject: "Welcome",
// //         transporter: mailTransporter,
// //       });
// //     } catch (error: any) {
// //       console.error(error);
// //       throw new InternalServerError(error.message);
// //     }
// //   };
// // }
