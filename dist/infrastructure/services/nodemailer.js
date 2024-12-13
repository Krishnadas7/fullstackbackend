"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Nodemailer {
    constructor() {
        this.otps = new Map();
    }
    //to generate otp
    generateOTP() {
        const digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }
    sendBulkEmail(event, subject, message, url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('sending bulk=========================================', event, subject, message, url);
            const transporter = yield nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: false,
                auth: {
                    user: 'skrishnadas38@gmail.com',
                    pass: 'jfne dimd aggq uwix',
                }
            });
            const emailOptions = {
                from: 'skrishnadas38@gmail.com', // sender address
                subject: subject,
                text: message,
                html: `<strong>${message} ${url}</strong>`,
            };
            const sendPromises = event.map((recipient) => __awaiter(this, void 0, void 0, function* () {
                const mailOptions = Object.assign(Object.assign({}, emailOptions), { to: recipient });
                yield transporter.sendMail(mailOptions);
            }));
            try {
                yield Promise.all(sendPromises);
                return 'Email successfully send';
            }
            catch (error) {
                return 'error';
            }
        });
    }
    sendEmailforForgotPassword(email, first_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let forgotToken = jsonwebtoken_1.default.sign({ email: email }, 'forgotToken123', { expiresIn: '5m' });
                console.log('ddd tol', forgotToken);
                let ffff = jsonwebtoken_1.default.verify(forgotToken, 'forgotToken123');
                const transporter = yield nodemailer_1.default.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    requireTLS: false,
                    auth: {
                        user: 'skrishnadas38@gmail.com',
                        pass: 'jfne dimd aggq uwix',
                    }
                });
                const mailOption = {
                    from: 'skrishnadas38@gmail.com',
                    to: email,
                    subject: 'LINK FOR FORGOT PASSWORD',
                    html: `<div> <a href='http://localhost:5173/user/new-password?forgotToken=${forgotToken}'>reset your passowrd please click here<a/><div/>`
                };
                yield transporter.sendMail(mailOption);
                console.log(`email sent to your registerd email ${email}`);
                return 'please check your email';
            }
            catch (error) {
                `Unable to send email verification email to ${email}: ${error}`;
            }
        });
    }
    //to send email for verification
    sendEmailVerification(email, first_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(email, first_name);
                const transporter = nodemailer_1.default.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    requireTLS: false,
                    auth: {
                        user: 'skrishnadas38@gmail.com',
                        pass: 'jfne dimd aggq uwix',
                    },
                });
                if (this.otps) {
                    this.otps.clear();
                }
                const otp = this.generateOTP();
                this.otps.set(email, otp);
                console.log(this.otps);
                const mailOptions = {
                    from: "skrishnadas38@gmail.com",
                    to: email,
                    subject: "Email Verification",
                    html: `
          <div>
            <div style="margin-bottom: 10px">
              Hello ${first_name}, Welcome to <strong>Event hive</strong>! We are excited to have you on board. To get started, please verify your email address:
            </div>
            <div style="width: 75%; margin: 0 auto; background-color: black; color: white; padding: 4px; font-size: 3rem; text-align: center;">
              <strong style="text">${otp}</strong>
            </div>
          </div>
        `,
                };
                yield transporter.sendMail(mailOptions);
                return "Hey please check your email";
            }
            catch (error) {
                throw new Error(`Unable to send email verification email to ${email}: ${error}`);
            }
        });
    }
    sendEmailForCompanyRegistration(company_email, company_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(company_email, company_name, 'from node');
                const transporter = nodemailer_1.default.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    requireTLS: false,
                    auth: {
                        user: 'skrishnadas38@gmail.com',
                        pass: 'jfne dimd aggq uwix',
                    },
                });
                if (this.otps) {
                    this.otps.clear();
                }
                const otp = this.generateOTP();
                this.otps.set(company_email, otp);
                console.log(this.otps);
                const mailOptions = {
                    from: "skrishnadas38@gmail.com",
                    to: company_email,
                    subject: "Email Verification",
                    html: `
          <div>
            <div style="margin-bottom: 10px">
              Hello ${company_name}, Welcome to <strong>Event hive</strong>! We are excited to have you on board. To get started, please verify your email address:
            </div>
            <div style="width: 75%; margin: 0 auto; background-color: black; color: white; padding: 4px; font-size: 3rem; text-align: center;">
              <strong style="text">${otp}</strong>
            </div>
          </div>
        `,
                };
                yield transporter.sendMail(mailOptions);
                return otp;
            }
            catch (error) {
                throw new Error(`Unable to send email verification email to ${company_email}: ${error}`);
            }
        });
    }
    sendMessageToEmail(email, first_name, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(email, first_name);
                const transporter = nodemailer_1.default.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    requireTLS: false,
                    auth: {
                        user: "skrishnadas38@gmail",
                        pass: 'jfne dimd aggq uwix',
                    },
                });
                const acceptMailOptions = {
                    from: "testingjobee007@gmail.com",
                    to: email,
                    subject: "Response For Your Worker Join Request",
                    html: `
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2>Application Accepted</h2>
            </div>
            <div style="margin-bottom: 20px;">
              <p>Dear ${first_name},</p>
              <p>Congratulations! Your application to join FixIt has been accepted.</p>
              <p>We are thrilled to welcome you to our platform. You have been selected based on your qualifications and experience, and we believe you will be a valuable addition to our team.</p>
              <p>Your journey with FixIt starts now. We look forward to working together and creating great experiences for our users.</p>
              <p>If you have any questions or need assistance, please do not hesitate to reach out to us.</p>
              <p>Welcome aboard!</p>
            </div>
            <div style="text-align: center; color: #666; font-size: 14px;">
              <p>Best regards,</p>
              <p>The FixIt Team</p>
            </div>
          </div>
        </body>
         `,
                };
                const rejectMailOptions = {
                    from: "testingjobee007@gmail.com",
                    to: email,
                    subject: "Response For Your Worker Join Request",
                    html: `
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2>Application Rejected</h2>
            </div>
            <div style="margin-bottom: 20px;">
              <p>Dear ${first_name},</p>
              <p>We regret to inform you that your application for joining event hive has been rejected.</p>
              <p>After careful consideration, we have determined that your profile does not meet our current requirements. We appreciate your interest in joining our platform and encourage you to continue enhancing your skills and experience.</p>
              <p>If you have any questions or would like more information about our decision, please feel free to contact us at admin@gmail.com.</p>
              <p>Thank you for your understanding.</p>
            </div>
            <div style="text-align: center; color: #666; font-size: 14px;">
              <p>Best regards,</p>
              <p>The event hive Team</p>
            </div>
          </div>
        </body>
        `,
                };
                if (status === "accept") {
                    yield transporter.sendMail(acceptMailOptions);
                }
                else {
                    yield transporter.sendMail(rejectMailOptions);
                }
                return "Success";
            }
            catch (error) {
                throw new Error(`Unable to send email verification email to ${email}: ${error}`);
            }
        });
    }
    //to verfiy the email to check if it is crct or not
    verifyEmail(enteredOTP, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('==== otp', this.otps, enteredOTP, email);
                const expectedOTP = this.otps.get(email);
                console.log('excepted', expectedOTP);
                if (expectedOTP === enteredOTP) {
                    console.log('truee');
                    this.otps.delete(email);
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new Error("Wrong otp");
            }
        });
    }
}
exports.default = Nodemailer;
