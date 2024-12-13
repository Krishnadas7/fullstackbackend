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
exports.companyRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const companyModel_1 = __importDefault(require("../../../infrastructure/database/model/companyModel"));
const companyRefreshToken = (companyRepository, Jwt, incomingRefreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
        const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
        if (!incomingRefreshToken) {
            console.log('from error incoming refreshtoken');
            return {
                status: 401,
                success: false,
                message: 'token is not valid'
            };
        }
        const decoded = jsonwebtoken_1.default.verify(incomingRefreshToken, refreshTokenKey);
        const user = yield companyModel_1.default.findOne({ _id: decoded.id });
        if (!user) {
            return {
                status: 401,
                success: false,
                message: 'token is not valid'
            };
        }
        const { accessToken, refreshToken } = yield Jwt.createJWT(user._id, user.company_email, "company", user.company_name);
        let obj = {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        return {
            status: 200,
            success: true,
            data: obj,
            message: 'tokens'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.companyRefreshToken = companyRefreshToken;