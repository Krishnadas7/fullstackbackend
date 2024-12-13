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
exports.filterUser = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const filterUser = (userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fUsers = yield userRepository.filterUsers();
        if (fUsers) {
            return {
                status: 200,
                success: true,
                message: 'filter users data',
                data: fUsers
            };
        }
        throw errorResponse_1.default.badRequest('something wrong in filter');
    }
    catch (error) {
        throw error;
    }
});
exports.filterUser = filterUser;
