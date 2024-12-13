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
exports.emailVeification = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const emailVeification = (nodemailer, otp, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(email);
        console.log('otp', otp);
        const verify = yield nodemailer.verifyEmail(otp, email);
        if (verify) {
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: "Succesfully logged In",
            };
        }
        throw errorResponse_1.default.badRequest("Wrong OTP");
    }
    catch (err) {
        throw err;
    }
});
exports.emailVeification = emailVeification;
