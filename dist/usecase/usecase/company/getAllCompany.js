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
exports.getAllCompany = void 0;
const statusCodes_1 = require("../../../utils/statusCodes");
const getAllCompany = (companyRepository, s3service, s3) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield companyRepository.getAllCompany();
        // const urlPromises = companies.map(async (company :ICompany) => {
        //     console.log('user profile image', company.company_logo);
        //     try {
        //         if(company && company._id){
        //             const companyId = company?._id.toString()
        //             const url = await s3service.getImages(s3, companyId as string);
        //             company.company_logo = url;
        //         }
        //     } catch (err) {
        //         console.error(`Failed to get pre-signed URL for image ${company.profileImage}:`, err);
        //         company.company_logo = ''; // Or handle it appropriately based on your requirements
        //     }
        // });
        // await Promise.all(urlPromises);
        return {
            status: statusCodes_1.StatusCodes.OK,
            success: true,
            message: 'all company details',
            data: companies
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getAllCompany = getAllCompany;
