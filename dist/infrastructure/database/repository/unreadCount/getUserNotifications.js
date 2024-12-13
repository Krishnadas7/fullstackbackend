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
exports.getUserNotifications = void 0;
const getUserNotifications = (userId, notificationModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notificationModel.findOne({ user: userId });
        console.log('noti user vai', notifications);
        return notifications;
    }
    catch (error) {
        console.log('error from repso noti');
        throw error;
    }
});
exports.getUserNotifications = getUserNotifications;
