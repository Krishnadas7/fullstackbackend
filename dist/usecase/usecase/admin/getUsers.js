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
exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../../../infrastructure/database/model/userModel"));
const getUsers = (s3service, s3) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        const urlPromises = users === null || users === void 0 ? void 0 : users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('user profile image', user.profileImage);
            try {
                const url = yield s3service.getImages(s3, user.profileImage);
                user.profileImage = url;
            }
            catch (err) {
                console.error(`Failed to get pre-signed URL for image ${user.profileImage}:`, err);
                user.profileImage = ''; // Or handle it appropriately based on your requirements
            }
        }));
        yield Promise.all(urlPromises);
        console.log('user from get users', users);
        return {
            status: 200,
            success: true,
            data: users,
            message: 'Users fetched'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getUsers = getUsers;
