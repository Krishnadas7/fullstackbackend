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
exports.updateProfile = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const statusCodes_1 = require("../../../utils/statusCodes");
const updateProfile = (userRepository, first_name, last_name, bio, qualification, socialmedialink1, socialmedialink2, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_KEY);
        console.log('decoded', decoded);
        if (decoded) {
            let id = decoded.id;
            const user = yield userRepository.updateProfile(first_name, last_name, qualification, bio, socialmedialink1, socialmedialink2, id);
            const responsedata = {
                _id: user === null || user === void 0 ? void 0 : user._id,
                first_name: user === null || user === void 0 ? void 0 : user.first_name,
                last_name: user === null || user === void 0 ? void 0 : user.last_name,
                qualification: user === null || user === void 0 ? void 0 : user.qualification,
                bio: user === null || user === void 0 ? void 0 : user.bio,
                socialmedialink1: user === null || user === void 0 ? void 0 : user.socialmedialink1,
                socialmedialink2: user === null || user === void 0 ? void 0 : user.socialmedialink2,
                email: user === null || user === void 0 ? void 0 : user.email,
                mobile: user === null || user === void 0 ? void 0 : user.mobile,
            };
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: 'user updated success fully',
                data: responsedata
            };
        }
        throw errorResponse_1.default.badRequest('something went wrong');
    }
    catch (error) {
        throw error;
    }
});
exports.updateProfile = updateProfile;
