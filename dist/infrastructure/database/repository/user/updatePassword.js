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
exports.updatePassword = void 0;
const updatePassword = (newPassword, email, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModels.findOne({ email: email });
        if (user) {
            user.password = newPassword;
            user.save();
        }
        else {
            return false;
        }
        return true;
    }
    catch (error) {
        throw error;
    }
});
exports.updatePassword = updatePassword;
