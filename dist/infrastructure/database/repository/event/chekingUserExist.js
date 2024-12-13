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
exports.checkingUserExist = void 0;
const checkingUserExist = (userId, eventId, eventModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use $addToSet to add userId only if it does not already exist in the registrations array
        const event = yield eventModels.findOneAndUpdate({ _id: eventId, registrations: { $ne: userId } }, { $addToSet: { registrations: userId } }, { new: true, useFindAndModify: false });
        // If the event is null, it means the userId was already in the array
        if (!event) {
            return false; // User was already registered
        }
        return true; // User successfully registered
    }
    catch (error) {
        throw error;
    }
});
exports.checkingUserExist = checkingUserExist;
