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
exports.googleAuth = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const googleAuth = (requestValidator, userRepository, bcrypt, jwt, s3service, s3, first_name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield userRepository.findUser(email);
        let url = '';
        if (!user) {
            const hashedPassword = yield bcrypt.createHash(password);
            const newUser = {
                first_name,
                email,
                password: hashedPassword,
                profileImg: url,
            };
            const creatingNewUser = yield userRepository.createUser(newUser);
            const { accessToken, refreshToken } = yield jwt.createJWT(creatingNewUser._id, creatingNewUser.email, "user", creatingNewUser.first_name);
            const responseData = {
                _id: creatingNewUser._id,
                name: creatingNewUser.first_name,
                email: creatingNewUser.email,
                profileImg: url,
                userAccessToken: accessToken,
                userRefreshToken: refreshToken,
            };
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                data: responseData,
                message: `Login successful, welcome ${creatingNewUser.first_name}`
            };
        }
        if (user && user._id) {
            if (user.is_block) {
                throw errorResponse_1.default.badRequest('your account is blocked');
            }
            if ((user === null || user === void 0 ? void 0 : user.profileImage) && (user === null || user === void 0 ? void 0 : user.profileImage) !== '') {
                const userId = (_a = user === null || user === void 0 ? void 0 : user._id) === null || _a === void 0 ? void 0 : _a.toString();
                url = yield s3service.getImages(s3, userId);
            }
            const { accessToken, refreshToken } = yield jwt.createJWT(user._id, user.email, "user", user.first_name);
            user.refreshToken = refreshToken;
            const responseData = {
                _id: user._id,
                name: user.first_name,
                email: user.email,
                profileImg: url,
                userAccessToken: accessToken,
                userRefreshToken: refreshToken,
            };
            return {
                status: 200,
                success: true,
                data: responseData,
                message: `Login successful, welcome ${user.first_name}`
            };
        }
        throw errorResponse_1.default.badRequest('wrong password or email');
    }
    catch (error) {
        throw error;
    }
});
exports.googleAuth = googleAuth;
