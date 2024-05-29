// import sendEmail from "../../../configurations/handlebars";
// import transporter from "../../../configurations/transporter";
// import { InternalServerError } from "../../../errors/InternalServerError";

// export class SchoolEmails {
//   public blastSchoolVerificationTokenMessage = async (data: any) => {
//     const mailTransporter = transporter();
//     try {
//       await sendEmail({
//         template: "school-otp",
//         context: {
//           ...data,
//         },
//         to: data.email,
//         from: "guident.team@gmail.com",
//         subject: "Email verification token",
//         transporter: mailTransporter,
//       });
//     } catch (error: any) {
//       console.error(error);
//       throw new InternalServerError(error.message);
//     }
//   };