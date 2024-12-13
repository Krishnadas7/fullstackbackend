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
exports.CompanyUseCase = void 0;
const createCompany_1 = require("./company/createCompany");
const companyLogin_1 = require("./company/companyLogin");
const sendEmailforCompany_1 = require("./company/sendEmailforCompany");
const getAllCompany_1 = require("./company/getAllCompany");
const getCompanyData_1 = require("./company/getCompanyData");
const companyProfileUpdate_1 = require("./company/companyProfileUpdate");
const blockCompany_1 = require("./company/blockCompany");
const companyRefreshToken_1 = require("./company/companyRefreshToken");
class CompanyUseCase {
    constructor(companyRepository, bcrypt, jwt, nodemailer, redis, s3service, s3, cloudinary) {
        this.companyRepository = companyRepository,
            this.bcrypt = bcrypt,
            this.jwt = jwt,
            this.nodemailer = nodemailer,
            this.redis = redis,
            this.s3Service = s3service,
            this.s3 = s3,
            this.cloudinary = cloudinary;
    }
    createCompany(_a) {
        return __awaiter(this, arguments, void 0, function* ({ company_name, company_email, company_website, company_address, industry_type, company_description, password, otp }) {
            return (0, createCompany_1.createCompany)(this.companyRepository, this.bcrypt, this.redis, this.nodemailer, company_name, company_email, company_website, company_address, industry_type, company_description, password, otp);
        });
    }
    companyLogin(_a) {
        return __awaiter(this, arguments, void 0, function* ({ company_email, password }) {
            return (0, companyLogin_1.companyLogin)(this.companyRepository, this.bcrypt, this.jwt, company_email, password);
        });
    }
    sendEmailforCompany(_a) {
        return __awaiter(this, arguments, void 0, function* ({ company_name, company_email, }) {
            return (0, sendEmailforCompany_1.sendEmailforCompany)(this.companyRepository, this.bcrypt, this.nodemailer, this.redis, company_name, company_email);
        });
    }
    getCompanyData(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getCompanyData_1.getcompanyData)(this.companyRepository, token);
        });
    }
    companyProfileUpdate(_a) {
        return __awaiter(this, arguments, void 0, function* ({ company_name, company_email, company_address, state, postal_code, country, company_website, locality, company_description, contact_personname, contact_personphone, industry_type, companyLogo, token }) {
            console.log('token ', token);
            return (0, companyProfileUpdate_1.companyProfileUpdate)(this.companyRepository, this.s3Service, this.s3, this.cloudinary, company_name, company_email, company_address, state, postal_code, country, company_website, locality, company_description, contact_personname, contact_personphone, industry_type, companyLogo, token);
        });
    }
    getAllCompany() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getAllCompany_1.getAllCompany)(this.companyRepository, this.s3Service, this.s3);
        });
    }
    blockCompany(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, blockCompany_1.blockCompany)(this.companyRepository, companyId);
        });
    }
    companyRefreshToken(incomingRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, companyRefreshToken_1.companyRefreshToken)(this.companyRepository, this.jwt, incomingRefreshToken);
        });
    }
}
exports.CompanyUseCase = CompanyUseCase;
