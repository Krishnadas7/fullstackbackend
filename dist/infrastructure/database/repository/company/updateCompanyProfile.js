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
exports.updateCompanyProfile = void 0;
const updateCompanyProfile = (company_name, company_email, company_address, state, postal_code, country, company_website, locality, company_description, company_contactperson, company_contactphone, industry_type, companyModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield companyModels.findOne({ company_email: company_email });
        if (company) {
            company.company_name = company_name;
            company.company_email = company_email;
            company.company_address = company_address;
            company.state = state;
            company.postal_code = postal_code;
            company.country = country;
            company.company_website = company_website;
            company.locality = locality;
            company.company_description = company_description;
            company.contact_personname = company_contactperson;
            company.contact_personphone = company_contactphone;
            company.industry_type = industry_type;
            yield company.save();
            return company;
        }
        return null;
    }
    catch (error) {
        throw error;
    }
});
exports.updateCompanyProfile = updateCompanyProfile;
