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
exports.MessageUseCase = void 0;
const createMessage_1 = require("./message/createMessage");
const getMessage_1 = require("./message/getMessage");
class MessageUseCase {
    constructor(messageRepository, unreadRepository) {
        this.messageRepository = messageRepository;
        this.unreadRepository = unreadRepository;
    }
    createMessage(_a) {
        return __awaiter(this, arguments, void 0, function* ({ conversationId, sender, text, }) {
            return (0, createMessage_1.createMessage)(this.messageRepository, this.unreadRepository, conversationId, sender, text);
        });
    }
    getMessage(conversationId, userToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getMessage_1.getMessage)(this.messageRepository, this.unreadRepository, conversationId, userToken);
        });
    }
}
exports.MessageUseCase = MessageUseCase;
