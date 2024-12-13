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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const conversatoinModel_1 = __importDefault(require("../../../infrastructure/database/model/conversatoinModel"));
const statusCodes_1 = require("../../../utils/statusCodes");
const createMessage = (messageRepository, unreadRepository, conversationId, sender, text) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let obj = {
            conversationId,
            sender,
            text
        };
        const newMessage = yield messageRepository.createMessage(obj);
        const conversation = yield conversatoinModel_1.default.findOne({ _id: conversationId });
        const receiverId = (_a = conversation === null || conversation === void 0 ? void 0 : conversation.members) === null || _a === void 0 ? void 0 : _a.find((id) => id != sender);
        const notification = yield unreadRepository.addChatNotification(sender, receiverId);
        return {
            status: statusCodes_1.StatusCodes.OK,
            success: true,
            message: 'new message is created',
            data: newMessage
        };
    }
    catch (error) {
        throw error;
    }
});
exports.createMessage = createMessage;
