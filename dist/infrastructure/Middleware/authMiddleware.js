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
const userRepository_1 = require("../database/repository/userRepository");
const adminRepository_1 = require("../database/repository/adminRepository");
const companyRepository_1 = require("../database/repository/companyRepository");
const userModel_1 = __importDefault(require("../database/model/userModel"));
const adminModel_1 = __importDefault(require("../database/model/adminModel"));
const companyModel_1 = __importDefault(require("../database/model/companyModel"));
class AuthMiddleware {
    static protectUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const userRepository = new userRepository_1.UserRepository(userModel_1.default);
            const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.userAccessToken) || ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.split(' ')[1]);
            console.log('accesstoken ', token);
            if (!token) {
                res.status(401).json({ message: 'Not authorized, no token' });
            }
            const accessTokenSecret = process.env.ACCESS_TOKEN_KEY;
            console.log('accesskeyy', accessTokenSecret);
            try {
                const decoded = jsonwebtoken_1.default.verify(token, accessTokenSecret);
                const user = yield userModel_1.default.findOne({ email: decoded.email });
                if (user && user.is_block) {
                    res.status(403).json({ error: 'Unauthorized3' });
                    return;
                }
                if (!user) {
                    res.status(401).json({ error: 'Unauthorized3' });
                }
                next(); // Pass the user to the next middleware
            }
            catch (error) {
                res.status(401).json({ error: 'Unauthorized' });
            }
        });
    }
    static protectAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const adminRepository = new adminRepository_1.AdminRepository(adminModel_1.default);
            const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.adminAccessToken) || ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.split(' ')[1]);
            if (!token) {
                res.status(401).json({ message: 'Not authorized , no token' });
            }
            const accessTokenSecret = process.env.ACCESS_TOKEN_KEY;
            try {
                const decoded = jsonwebtoken_1.default.verify(token, accessTokenSecret);
                console.log('decoded form ===========', decoded);
                const user = yield adminModel_1.default.findOne({ _id: decoded.id });
                if (!user) {
                    res.status(401).json({ error: 'Unauthorized3' });
                }
                next(); // Pass the user to the next middleware
            }
            catch (error) {
                res.status(401).json({ error: 'Unauthorized' });
            }
        });
    }
    static protectCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const adminRepository = new companyRepository_1.CompanyRepository(companyModel_1.default);
            const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.companyAccessToken) || ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.split(' ')[1]);
            console.log('tok-===', token);
            if (!token) {
                res.status(401).json({ message: 'Not authorized , no token' });
            }
            const accessTokenSecret = process.env.ACCESS_TOKEN_KEY;
            try {
                const decoded = jsonwebtoken_1.default.verify(token, accessTokenSecret);
                if (!decoded) {
                    console.log('decode failed');
                }
                console.log('decoded form ===========', decoded);
                const company = yield companyModel_1.default.findOne({ _id: decoded.id });
                console.log('compnyy', company);
                if (!company) {
                    res.status(401).json({ error: 'Unauthorized3' });
                }
                // req.admin = user;
                next(); // Pass the user to the next middleware
            }
            catch (error) {
                console.log('erro rfrom auth');
                res.status(401).json({ error: 'Unauthorized' });
            }
        });
    }
}
exports.default = AuthMiddleware;
