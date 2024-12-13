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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtPassword {
    createJWT(userid, email, role, first_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
            const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
            if (accessTokenKey && refreshTokenKey) {
                const accessToken = jsonwebtoken_1.default.sign({ id: userid, email: email, role: role, name: first_name }, accessTokenKey, { expiresIn: '1d' } // Adjust as needed
                );
                const refreshToken = jsonwebtoken_1.default.sign({ id: userid }, refreshTokenKey, { expiresIn: '30d' } // Adjust as needed
                );
                return { accessToken, refreshToken };
            }
            throw new Error('token is not created');
        });
    }
}
exports.default = JwtPassword;
