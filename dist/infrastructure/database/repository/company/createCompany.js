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
exports.createCompany = void 0;
const createCompany = (company, companyModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyD = yield companyModel.create(company);
        console.log('created companyyyy', companyD, companyD._id);
        yield companyD.save();
        const responseData = {
            _id: companyD._id,
            company_email: companyD.company_email,
            company_name: companyD.company_name
        };
        return responseData;
    }
    catch (error) {
        throw error;
    }
});
exports.createCompany = createCompany;
