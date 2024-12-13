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
exports.addConversation = void 0;
const statusCodes_1 = require("../../../utils/statusCodes");
const addConversation = (senderId, receiverId, conversationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newConversation = yield conversationRepository.addConversation(senderId, receiverId);
        console.log(newConversation, 'new con');
        return {
            status: statusCodes_1.StatusCodes.OK,
            success: true,
            message: 'conversation added',
            data: newConversation
        };
    }
    catch (error) {
        console.log(error, 'new conversation');
        throw error;
    }
});
exports.addConversation = addConversation;
