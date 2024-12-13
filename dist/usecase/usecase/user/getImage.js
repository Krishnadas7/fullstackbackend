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
exports.getImage = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const getImage = (userRepository, s3service, s3, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findUser(email);
        if (user && user._id) {
            const userId = user._id.toString();
            console.log('useridddddd', userId);
            const url = yield s3service.getImages(s3, userId);
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: 'message is got',
                data: url
            };
        }
        throw errorResponse_1.default.badRequest('wrong in image showing');
    }
    catch (error) {
        throw error;
    }
});
exports.getImage = getImage;
