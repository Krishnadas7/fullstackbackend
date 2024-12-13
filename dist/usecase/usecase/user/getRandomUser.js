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
exports.getRandomUser = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const getRandomUser = (userRepository, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('user data................', userId);
        const user = yield userRepository.getRandomUser(userId);
        if (user) {
            const responsedata = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                qualification: user.qualification,
                bio: user.bio,
                socialmedialink1: user.socialmedialink1,
                socialmedialink2: user.socialmedialink2
            };
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: 'this is userdata',
                data: responsedata
            };
        }
        throw errorResponse_1.default.badRequest('user is not found');
    }
    catch (error) {
        throw error;
    }
});
exports.getRandomUser = getRandomUser;
