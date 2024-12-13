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
exports.UnreadRepository = void 0;
const addChatNotification_1 = require("./unreadCount/addChatNotification");
const getUserNotifications_1 = require("./unreadCount/getUserNotifications");
const removeChatNotication_1 = require("./unreadCount/removeChatNotication");
class UnreadRepository {
    constructor(unreadModels) {
        this.unreadModels = unreadModels;
    }
    addChatNotification(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, addChatNotification_1.addChatNotification)(senderId, receiverId, this.unreadModels);
        });
    }
    getUserNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getUserNotifications_1.getUserNotifications)(userId, this.unreadModels);
        });
    }
    removeChatNotification(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, removeChatNotication_1.removeChatNotification)(senderId, receiverId, this.unreadModels);
        });
    }
}
exports.UnreadRepository = UnreadRepository;
