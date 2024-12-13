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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const createUser_1 = require("./user/createUser");
const findUser_1 = require("./user/findUser");
const blockUser_1 = require("./user/blockUser");
const forgotPassword_1 = require("./user/forgotPassword");
const updateUserImage_1 = require("./user/updateUserImage");
const updatePassword_1 = require("./user/updatePassword");
const updateProfile_1 = require("./user/updateProfile");
const getRandomUser_1 = require("./user/getRandomUser");
const memberExist_1 = require("./user/memberExist");
const addTeam_1 = require("./user/addTeam");
const usersCount_1 = require("./user/usersCount");
const filterUsers_1 = require("./user/filterUsers");
const allUsers_1 = require("./user/allUsers");
class UserRepository {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, createUser_1.createUser)(newUser, this.usersModel);
        });
    }
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, findUser_1.findUser)(email, this.usersModel);
        });
    }
    blockUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, blockUser_1.blockUser)(_id, this.usersModel);
        });
    }
    forgotPassword(newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, forgotPassword_1.forgotPassword)(newPassword, this.usersModel);
        });
    }
    uploadProfileImage(image, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, updateUserImage_1.uploadUserImage)(image, id, this.usersModel);
        });
    }
    updatePassword(newPassword, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, updatePassword_1.updatePassword)(newPassword, email, this.usersModel);
        });
    }
    updateProfile(first_name, last_name, qualification, bio, socialmedialink1, socialmedialink2, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, updateProfile_1.updateProfile)(first_name, last_name, qualification, bio, socialmedialink1, socialmedialink2, id, this.usersModel);
        });
    }
    getRandomUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getRandomUser_1.getRandomUser)(userId, this.usersModel);
        });
    }
    memberExist(userId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, memberExist_1.memberExist)(userId, email, this.usersModel);
        });
    }
    addTeam(team, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, addTeam_1.addTeam)(team, user_id, this.usersModel);
        });
    }
    usersCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, usersCount_1.usersCount)(this.usersModel);
        });
    }
    filterUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, filterUsers_1.filterUser)(this.usersModel);
        });
    }
    allUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, allUsers_1.allUsers)(this.usersModel);
        });
    }
}
exports.UserRepository = UserRepository;
