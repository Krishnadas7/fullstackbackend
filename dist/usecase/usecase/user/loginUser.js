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
exports.loginUser = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const loginUser = (requestValidator, userRepository, bcrypt, jwt, s3service, s3, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = requestValidator.validateRequiredFields({ email, password }, ["email", "password"]);
        if (!validation.success) {
            throw errorResponse_1.default.badRequest(validation.message);
        }
        const user = yield userRepository.findUser(email);
        if (user && user._id) {
            if (user.is_block) {
                throw errorResponse_1.default.badRequest('You are corrently blocked');
            }
            const match = yield bcrypt.compare(password, user.password);
            if (match) {
                const { accessToken, refreshToken } = yield jwt.createJWT(user._id, user.email, "user", user.first_name);
                // const userId = user._id.toString()
                // let url:string=''
                // if(user.profileImage!==''){
                //      url =await s3service.getImages(s3,userId)
                // }
                // console.log('url from login user',url)
                user.refreshToken = refreshToken;
                const responseData = {
                    _id: user._id,
                    name: user.first_name,
                    email: user.email,
                    profileImg: user.profileImage,
                    userAccessToken: accessToken,
                    userRefreshToken: refreshToken,
                };
                return {
                    status: statusCodes_1.StatusCodes.OK,
                    success: true,
                    data: responseData,
                    message: `Login successful, welcome ${user.first_name}`
                };
            }
            throw errorResponse_1.default.badRequest('wrong password or email');
        }
        throw errorResponse_1.default.badRequest('wrong password or email');
    }
    catch (error) {
        throw error;
    }
});
exports.loginUser = loginUser;
