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
exports.removeChatNotification = void 0;
const removeChatNotification = (senderId, receiverId, notificationModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateQuery = { $set: { [`chat.${senderId}`]: 0 } };
        const result = yield notificationModel.findOneAndUpdate({ user: receiverId }, updateQuery, { upsert: true, new: true, setDefaultsOnInsert: true });
        return result;
    }
    catch (error) {
        console.error("Error updating notification:", error);
        throw error; // Re-throw the error after logging it
    }
});
exports.removeChatNotification = removeChatNotification;
