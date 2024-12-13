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
exports.CompanyAdapter = void 0;
class CompanyAdapter {
    constructor(companyusecase) {
        this.companyusecase = companyusecase;
    }
    createCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCompany = yield this.companyusecase.createCompany(req.body);
                if (newCompany) {
                    res.status(newCompany.status).json({
                        success: newCompany.success,
                        message: newCompany.message,
                        company: newCompany.data
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    companyLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield this.companyusecase.companyLogin(req.body);
                if (company) {
                    res.cookie("companyAccessToken", company.data.companyAccessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        maxAge: 900000
                    });
                    res.cookie("companyRefreshToken", company.data.companyRefreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
                    });
                }
                res.status(company.status).json({
                    success: company.success,
                    data: company.data,
                    message: company.message,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    sendEmailforCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sendEmail = yield this.companyusecase.sendEmailforCompany(req.body);
                console.log('body for company====', req.body);
                if (sendEmail) {
                    res.status(sendEmail.status).json({
                        success: sendEmail.success,
                        message: sendEmail.message,
                    });
                }
            }
            catch (error) {
                console.log('error from company sendemail', error);
                next(error);
            }
        });
    }
    getCompanyProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies.companyAccessToken;
                console.log(token);
                const companyData = yield this.companyusecase.getCompanyData(token);
                res.status(companyData.status).json({
                    success: companyData.success,
                    message: companyData.message,
                    data: companyData.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    companyProfileUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyLogo = req.file;
                if (companyLogo) {
                    const obj = {
                        company_name: req.body.company_name,
                        company_email: req.body.company_email,
                        company_address: req.body.company_address,
                        state: req.body.state,
                        postal_code: req.body.postal_code,
                        country: req.body.country,
                        company_website: req.body.company_website,
                        locality: req.body.locality,
                        company_description: req.body.company_description,
                        contact_personname: req.body.contact_personname,
                        contact_personphone: req.body.contact_personphone,
                        industry_type: req.body.industry_type,
                        companyLogo: companyLogo,
                        token: req.body.token
                    };
                    const profileUpdate = yield this.companyusecase.companyProfileUpdate(obj);
                    res.status(profileUpdate.status).json({
                        success: profileUpdate.success,
                        message: profileUpdate.message,
                        data: profileUpdate.data
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companies = yield this.companyusecase.getAllCompany();
                if (companies) {
                    res.status(companies.status).json({
                        success: companies.success,
                        message: companies.message,
                        data: companies.data
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    blockCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyId = req.body.companyId;
                const blocked = yield this.companyusecase.blockCompany(companyId);
                res.status(blocked.status).json({
                    success: blocked.success,
                    message: blocked.message
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    companyRefreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const incomingRefreshToken = req.body.refreshToken;
                const tokens = yield this.companyusecase.companyRefreshToken(incomingRefreshToken);
                const accessToken = (_a = tokens.data) === null || _a === void 0 ? void 0 : _a.accessToken;
                const refreshToken = (_b = tokens.data) === null || _b === void 0 ? void 0 : _b.refreshToken;
                res.status(tokens.status)
                    .cookie("companyAccessToken", accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 900000
                })
                    .cookie("companyRefreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000
                })
                    .json({ accessToken, refreshToken });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CompanyAdapter = CompanyAdapter;
