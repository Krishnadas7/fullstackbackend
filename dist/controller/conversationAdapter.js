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
exports.ConversationAdapter = void 0;
class ConversationAdapter {
    constructor(conversationusecase) {
        this.conversationusecase = conversationusecase;
    }
    addConversation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newConversation = yield this.conversationusecase.addConversation(req.body);
                console.log(newConversation, 'newccc');
                res.status(newConversation.status).json({
                    success: newConversation.success,
                    message: newConversation.message,
                    data: newConversation.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getConversation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.query.userId, req.params.userId);
            let userId = req.query.userId;
            const conversation = yield this.conversationusecase.getConversation(userId);
            res.status(conversation.status).json({
                success: conversation.success,
                message: conversation.message,
                data: conversation.data
            });
        });
    }
}
exports.ConversationAdapter = ConversationAdapter;
