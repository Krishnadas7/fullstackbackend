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
exports.userRefreshToken = void 0;
const userModel_1 = __importDefault(require("../../../infrastructure/database/model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRefreshToken = (userRepository, Jwt, incomingRefreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
        const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
        if (!incomingRefreshToken) {
            return {
                status: 401,
                success: false,
                message: 'access token is not available'
            };
        }
        const decoded = jsonwebtoken_1.default.verify(incomingRefreshToken, refreshTokenKey);
        const user = yield userModel_1.default.findOne({ _id: decoded.id });
        if (!user) {
            return {
                status: 401,
                success: false,
                message: 'user is not defined'
            };
        }
        const { accessToken, refreshToken } = yield Jwt.createJWT(user._id, user.email, "user", user.first_name);
        let obj = {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        return {
            status: 200,
            success: false,
            data: obj,
            message: 'refresh token'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.userRefreshToken = userRefreshToken;
