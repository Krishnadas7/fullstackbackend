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
const addConversation = (senderId, receiverId, conversationModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if a conversation already exists
        const existingConversation = yield conversationModel.findOne({
            members: { $all: [senderId, receiverId] }
        });
        if (existingConversation) {
            // Return the existing conversation if found
            return existingConversation;
        }
        // Create a new conversation if not found
        const newConversation = yield conversationModel.create({
            members: [senderId, receiverId]
        });
        yield newConversation.save();
        console.log(newConversation, 'new coversation');
        return newConversation;
    }
    catch (error) {
        throw error;
    }
});
exports.addConversation = addConversation;
