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
exports.updateProfile = void 0;
const updateProfile = (first_name, last_name, qualification, bio, socialmedialink1, socialmedialink2, id, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModels.findOne({ _id: id });
    if (user) {
        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.qualification = qualification || user.qualification;
        user.bio = bio || user.bio;
        user.socialmedialink1 = socialmedialink1 || user.socialmedialink1;
        user.socialmedialink2 = socialmedialink2 || user.socialmedialink2;
        yield user.save();
        return user;
    }
    return user;
});
exports.updateProfile = updateProfile;
