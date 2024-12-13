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
exports.ConversationUseCase = void 0;
const addConversation_1 = require("./conversation/addConversation");
const getConversation_1 = require("./conversation/getConversation");
class ConversationUseCase {
    constructor(conversationRepository) {
        this.conversationRepository = conversationRepository;
    }
    addConversation(_a) {
        return __awaiter(this, arguments, void 0, function* ({ senderId, receiverId }) {
            return (0, addConversation_1.addConversation)(senderId, receiverId, this.conversationRepository);
        });
    }
    getConversation(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getConversation_1.getConversation)(userId, this.conversationRepository);
        });
    }
}
exports.ConversationUseCase = ConversationUseCase;
