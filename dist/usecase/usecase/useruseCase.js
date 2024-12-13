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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
const createUser_1 = require("./user/createUser");
const loginUser_1 = require("./user/loginUser");
const sendOtpForgotPassword_1 = require("./user/sendOtpForgotPassword");
const emailVerification_1 = require("./user/emailVerification");
const forgotPassword_1 = require("./user/forgotPassword");
const sendEmail_1 = require("./user/sendEmail");
const googleAuth_1 = require("./user/googleAuth");
const profileImageUpdate_1 = require("./user/profileImageUpdate");
const resetPassword_1 = require("./user/resetPassword");
const tokenValidation_1 = require("./user/tokenValidation");
const profileUpdate_1 = require("./user/profileUpdate");
const userData_1 = require("./user/userData");
const getRandomUser_1 = require("./user/getRandomUser");
const getImage_1 = require("./user/getImage");
const memberExist_1 = require("./user/memberExist");
const getNotification_1 = require("./user/getNotification");
const userRefreshToken_1 = require("./user/userRefreshToken");
const createReport_1 = require("./user/createReport");
const allUser_1 = require("./user/allUser");
class UserUseCase {
    constructor(reportRepository, userRepository, unreadRepository, bcrypt, nodemailer, jwt, requestValidator, s3service, s3, cloudinary) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
        this.unreadRepository = unreadRepository,
            this.bcrypt = bcrypt;
        this.nodemailer = nodemailer;
        this.jwt = jwt;
        this.requestValidator = requestValidator;
        this.s3Service = s3service;
        this.s3 = s3;
        this.cloudinary = cloudinary;
    }
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ first_name, last_name, email, password, confirm_password, mobile }) {
            return (0, createUser_1.createUser)(this.userRepository, this.bcrypt, first_name, last_name, email, password, confirm_password, mobile);
        });
    }
    loginUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, }) {
            return (0, loginUser_1.loginUser)(this.requestValidator, this.userRepository, this.bcrypt, this.jwt, this.s3Service, this.s3, email, password);
        });
    }
    googleAuth(_a) {
        return __awaiter(this, arguments, void 0, function* ({ first_name, email, password }) {
            return (0, googleAuth_1.googleAuth)(this.requestValidator, this.userRepository, this.bcrypt, this.jwt, this.s3Service, this.s3, first_name, email, password);
        });
    }
    verifyEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ first_name, email }) {
            return (0, sendEmail_1.verifyEmail)(this.userRepository, this.nodemailer, first_name, email);
        });
    }
    emailVeification(_a) {
        return __awaiter(this, arguments, void 0, function* ({ otp, email }) {
            return (0, emailVerification_1.emailVeification)(this.nodemailer, otp, email);
        });
    }
    tokenValidation(_a) {
        return __awaiter(this, arguments, void 0, function* ({ forgotToken }) {
            return (0, tokenValidation_1.tokenValidation)(forgotToken);
        });
    }
    sendEmailFogotPassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, name }) {
            return (0, sendOtpForgotPassword_1.sendEmailFogotPassword)(this.userRepository, this.nodemailer, email, name);
        });
    }
    forgotPassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, }) {
            return (0, forgotPassword_1.forgotPassword)(this.userRepository, this.bcrypt, this.jwt, email, password);
        });
    }
    uploadProfileImage(_a) {
        return __awaiter(this, arguments, void 0, function* ({ image, id, email }) {
            return (0, profileImageUpdate_1.profileImageUpdate)(this.userRepository, this.s3Service, this.s3, this.cloudinary, image, id, email);
        });
    }
    resetPassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ password, forgotToken }) {
            return (0, resetPassword_1.resetPassword)(this.userRepository, this.bcrypt, password, forgotToken);
        });
    }
    updateProfile(_a) {
        return __awaiter(this, arguments, void 0, function* ({ first_name, last_name, bio, qualification, socialmedialink1, socialmedialink2, token }) {
            return (0, profileUpdate_1.updateProfile)(this.userRepository, first_name, last_name, bio, qualification, socialmedialink1, socialmedialink2, token);
        });
    }
    userData(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, userData_1.userData)(this.userRepository, email);
        });
    }
    getRandomUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getRandomUser_1.getRandomUser)(this.userRepository, userId);
        });
    }
    getImage(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getImage_1.getImage)(this.userRepository, this.s3Service, this.s3, email);
        });
    }
    memberExist(userId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, memberExist_1.memberExist)(this.userRepository, userId, email);
        });
    }
    createReport(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userEmail, report }) {
            return (0, createReport_1.createReport)(userEmail, report, this.reportRepository);
        });
    }
    getNotification(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getNotification_1.getNotification)(this.unreadRepository, token);
        });
    }
    userRefreshToken(incomingRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, userRefreshToken_1.userRefreshToken)(this.userRepository, this.jwt, incomingRefreshToken);
        });
    }
    allUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, allUser_1.allUsers)(this.userRepository);
        });
    }
}
exports.UserUseCase = UserUseCase;
