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
exports.getConversation = void 0;
const getConversation = (userId, conversationModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversations = yield conversationModels.find({
            members: { $in: [userId] },
        }).sort({ updatedAt: -1 });
        return conversations;
    }
    catch (error) {
        throw error;
    }
});
exports.getConversation = getConversation;
