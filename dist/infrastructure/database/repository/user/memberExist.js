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
exports.memberExist = void 0;
const memberExist = (userId, email, userModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('===', userId, email);
        const regex = new RegExp(`^${email}`, 'i');
        const exist = yield userModel.findOne({
            _id: userId,
            team: { $elemMatch: { $regex: regex } }
        });
        if (exist) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error('Error in memberExist:', error);
        throw error;
    }
});
exports.memberExist = memberExist;
