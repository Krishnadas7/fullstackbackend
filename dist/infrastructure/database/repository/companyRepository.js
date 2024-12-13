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
exports.CompanyRepository = void 0;
const createCompany_1 = require("./company/createCompany");
const findCompany_1 = require("./company/findCompany");
const findCompanyWithId_1 = require("./company/findCompanyWithId");
const updateCompanyImageName_1 = require("./company/updateCompanyImageName");
const updateCompanyProfile_1 = require("./company/updateCompanyProfile");
const getAllCompany_1 = require("./company/getAllCompany");
const blockCompany_1 = require("./company/blockCompany");
class CompanyRepository {
    constructor(companysModel) {
        this.companysModel = companysModel;
    }
    createCompany(company) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, createCompany_1.createCompany)(company, this.companysModel);
        });
    }
    findCompany(company_email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, findCompany_1.findCompany)(company_email, this.companysModel);
        });
    }
    findCompanyWithId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, findCompanyWithId_1.findCompanyWithId)(id, this.companysModel);
        });
    }
    updateCompanyImageName(image, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, updateCompanyImageName_1.updateCompanyImageName)(image, id, this.companysModel);
        });
    }
    updateProfile(company_name, company_email, company_address, state, postal_code, country, company_website, locality, company_description, company_contactperson, company_contactphone, industry_type) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, updateCompanyProfile_1.updateCompanyProfile)(company_name, company_email, company_address, state, postal_code, country, company_website, locality, company_description, company_contactperson, company_contactphone, industry_type, this.companysModel);
        });
    }
    getAllCompany() {
        return (0, getAllCompany_1.getAllCompany)(this.companysModel);
    }
    blockCompany(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, blockCompany_1.blockCompany)(companyId, this.companysModel);
        });
    }
}
exports.CompanyRepository = CompanyRepository;
