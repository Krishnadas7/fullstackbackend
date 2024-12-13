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
exports.MessageRepository = void 0;
const createMessage_1 = require("./message/createMessage");
const getMessage_1 = require("./message/getMessage");
class MessageRepository {
    constructor(messageModels) {
        this.messageModels = messageModels;
    }
    createMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, createMessage_1.createMessage)(message, this.messageModels);
        });
    }
    getMessage(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getMessage_1.getMessage)(conversationId, this.messageModels);
        });
    }
}
exports.MessageRepository = MessageRepository;
