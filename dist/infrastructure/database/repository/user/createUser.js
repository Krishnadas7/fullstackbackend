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
exports.createUser = void 0;
const createUser = (newUser, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('infra reposi user create user page ');
        const user = yield userModels.create(newUser);
        user.is_verified = true;
        yield user.save();
        const responseData = {
            _id: user._id,
            email: user.email,
            name: user.first_name,
        };
        return responseData;
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
