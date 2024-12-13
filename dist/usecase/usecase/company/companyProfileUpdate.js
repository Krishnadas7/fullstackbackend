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
exports.companyProfileUpdate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const companyModel_1 = __importDefault(require("../../../infrastructure/database/model/companyModel"));
const companyProfileUpdate = (companyRepository, s3service, s3, cloudinary, company_name, company_email, company_address, state, postal_code, country, company_website, locality, company_description, contact_personname, contact_personphone, industry_type, companyLogo, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_KEY);
        // const imageUpload = await s3service.profileImageUpdate(s3,companyLogo,decoded.id)
        // if(imageUpload){
        // const response = await companyRepository.updateCompanyImageName(imageUpload,decoded.id)
        const company = yield companyModel_1.default.findOne({ company_email: company_email });
        if (company) {
            const imageU = yield cloudinary.imageUpload(companyLogo, company._id);
            const urlSetUp = yield cloudinary.getImage(company._id);
            company.company_logo = urlSetUp;
            yield company.save();
            const updateProfile = yield companyRepository.updateProfile(company_name, company_email, company_address, state, postal_code, country, company_website, locality, company_description, contact_personname, contact_personphone, industry_type);
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: 'your profile was updated',
                data: updateProfile
            };
        }
        throw errorResponse_1.default.badRequest('wrong in edit profile');
    }
    catch (error) {
        throw error;
    }
});
exports.companyProfileUpdate = companyProfileUpdate;
