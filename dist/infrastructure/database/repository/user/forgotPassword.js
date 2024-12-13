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
exports.forgotPassword = void 0;
const forgotPassword = (newPassword, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModels.findOne({ email: newPassword.email });
        if (user) {
            user.password = newPassword.password;
            yield user.save();
            const responseData = {
                _id: user._id,
                name: user.first_name,
                email: user.email
            };
            return responseData;
        }
        throw new Error("Internal Server Error");
    }
    catch (error) {
        throw error;
    }
});
exports.forgotPassword = forgotPassword;
