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
exports.sendEmailforCompany = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
// import {redisClient}  from "../../../infrastructure/config/redis";
const statusCodes_1 = require("../../../utils/statusCodes");
const sendEmailforCompany = (CompanyRepository, bcrypt, nodemailer, redis, company_name, company_email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await connectToRedis()
        const companyData = yield CompanyRepository.findCompany(company_email);
        if (companyData) {
            throw errorResponse_1.default.badRequest('email already exists');
        }
        yield nodemailer.sendEmailForCompanyRegistration(company_email, company_name);
        return {
            status: statusCodes_1.StatusCodes.OK,
            success: true,
            message: 'check your email'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.sendEmailforCompany = sendEmailforCompany;
