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
exports.companyLogin = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const companyLogin = (companyRepository, bcrypt, jwt, company_email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield companyRepository.findCompany(company_email);
        if (company) {
            if (company && company.is_block) {
                throw errorResponse_1.default.badRequest('your currently blocked');
            }
            const match = yield bcrypt.compare(password, company.password);
            if (match) {
                const { accessToken, refreshToken } = yield jwt.createJWT(company._id, company.company_email, "company", company.company_name);
                const responseData = {
                    _id: company._id,
                    company_email: company.company_email,
                    company_name: company.company_name,
                    companyAccessToken: accessToken,
                    companyRefreshToken: refreshToken,
                };
                return {
                    status: statusCodes_1.StatusCodes.OK,
                    success: true,
                    data: responseData,
                    message: `login successfully,welcome company ${company.company_name}`
                };
            }
            throw errorResponse_1.default.badRequest("wrong password or email");
        }
        throw errorResponse_1.default.badRequest("wrong password or email");
    }
    catch (error) {
        throw error;
    }
});
exports.companyLogin = companyLogin;
