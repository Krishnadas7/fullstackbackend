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
exports.getMessage = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const conversatoinModel_1 = __importDefault(require("../../../infrastructure/database/model/conversatoinModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const statusCodes_1 = require("../../../utils/statusCodes");
const getMessage = (messageRepository, unreadRepository, conversationId, userToken) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const message = yield messageRepository.getMessage(conversationId);
        console.log('usss========================================', message);
        const decoded = yield jsonwebtoken_1.default.verify(userToken, 'refreshtokenkey123');
        const conversation = yield conversatoinModel_1.default.findOne({ _id: conversationId });
        if (decoded) {
            const receiverId = (_a = conversation === null || conversation === void 0 ? void 0 : conversation.members) === null || _a === void 0 ? void 0 : _a.find((id) => id != decoded.id);
            const deleteCount = yield unreadRepository.removeChatNotification(receiverId, decoded.id);
        }
        console.log('messages', message);
        if (message) {
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: 'message',
                data: message
            };
        }
        throw errorResponse_1.default.badRequest('no message is left');
    }
    catch (error) {
        console.log('error in message', error);
        throw error;
    }
});
exports.getMessage = getMessage;
