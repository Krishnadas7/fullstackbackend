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
exports.resetPassword = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const statusCodes_1 = require("../../../utils/statusCodes");
const resetPassword = (userRepository, bcrypt, password, forgotToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('from res', forgotToken);
        console.log(process.env.FORGOT_TOKEN);
        const decoded = jsonwebtoken_1.default.verify(forgotToken, process.env.FORGOT_TOKEN || '');
        console.log('decode error', decoded);
        const resetP = yield userRepository.findUser(decoded.email);
        const newPassword = yield bcrypt.createHash(password);
        const updatePassword = yield userRepository.updatePassword(newPassword, decoded.email);
        if (updatePassword) {
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: 'password updated',
                data: true
            };
        }
        throw errorResponse_1.default.badRequest('updating failed');
    }
    catch (error) {
        throw error;
    }
});
exports.resetPassword = resetPassword;
