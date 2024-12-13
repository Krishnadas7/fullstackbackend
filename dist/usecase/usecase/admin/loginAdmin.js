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
exports.loginAdmin = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const loginAdmin = (adminRepository, bcrypt, jwt, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield adminRepository.findAdmin(email);
        console.log('admin from usecase', admin);
        if (admin && admin._id) {
            const match = yield bcrypt.compare(password, admin.password);
            if (match) {
                const { accessToken, refreshToken } = yield jwt.createJWT(admin._id, admin.email, "admin", admin.name);
                console.log('admin token', accessToken, refreshToken);
                const responseData = {
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    adminAccessToken: accessToken,
                    adminRefreshToken: refreshToken,
                };
                return {
                    status: 200,
                    success: true,
                    data: responseData,
                    message: `login successfully welcome ${admin.name}`
                };
            }
            throw errorResponse_1.default.badRequest("enter proper password");
        }
        throw errorResponse_1.default.badRequest("wrong password or email");
    }
    catch (error) {
        throw error;
    }
});
exports.loginAdmin = loginAdmin;
