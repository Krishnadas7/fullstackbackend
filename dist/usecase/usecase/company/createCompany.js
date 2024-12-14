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
exports.createCompany = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const createCompany = (companyRepository, bcrypt, redis, nodemailer, company_name, company_email, company_website, company_address, industry_type, company_description, password, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  const dataFromRedis: string | null = await redisClient.get('companyData')
        //  const datas: ICompany = dataFromRedis ? JSON.parse(dataFromRedis) : {};
        //  if(otp !=datas.otp){
        //       throw ErrorResponse.badRequest('invalid otp')
        //  }
        // try {
        //   console.log(otp,' ddsdsds',company_name);
        //   const res = await nodemailer.verifyEmail(otp,company_email)
        //   console.log('res from rverigy',res);
        //     if(!res){
        //       throw ErrorResponse.badRequest('invalid otp')
        //     }
        // } catch (error) {
        //    throw ErrorResponse.badRequest('invalid otp')
        // }
        console.log('email verified======');
        const res = yield nodemailer.verifyEmail(otp, company_email);
        if (!res) {
            throw errorResponse_1.default.badRequest('invalid otp');
        }
        const hashedPassword = yield bcrypt.createHash(password);
        console.log('hasheddd============', hashedPassword);
        const company = {
            company_name: company_name,
            company_email: company_email,
            company_website: company_website,
            company_address: company_address,
            industry_type: industry_type,
            company_description: company_description,
            password: hashedPassword
        };
        const newCompany = yield companyRepository.createCompany(company);
        return {
            status: statusCodes_1.StatusCodes.OK,
            success: true,
            message: `company created successfully ${company_name}`,
            data: newCompany
        };
    }
    catch (error) {
        throw error;
    }
});
exports.createCompany = createCompany;
