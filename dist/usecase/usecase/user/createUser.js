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
exports.createUser = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const createUser = (userRepository, bcrypt, first_name, last_name, email, password, confirm_password, mobile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findUser(email);
        if (!user) {
            const hashedPassword = yield bcrypt.createHash(password);
            const newUser = {
                first_name,
                last_name,
                email,
                is_verified: true,
                mobile,
                profileImage: '',
                password: hashedPassword,
            };
            const createnewUser = yield userRepository.createUser(newUser);
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: `Account was created ${createnewUser.name}`,
                data: createnewUser
            };
        }
        throw errorResponse_1.default.badRequest('user already exists');
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
