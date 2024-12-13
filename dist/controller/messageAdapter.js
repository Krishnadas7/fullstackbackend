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
exports.MessageAdapter = void 0;
const errorResponse_1 = __importDefault(require("../usecase/handler/errorResponse"));
class MessageAdapter {
    constructor(messageusecase) {
        this.messageusecase = messageusecase;
    }
    createMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = yield this.messageusecase.createMessage(req.body);
                if (newMessage) {
                    res.status(newMessage.status).json({
                        success: newMessage.success,
                        message: newMessage.message,
                        data: newMessage.data
                    });
                }
                errorResponse_1.default.badRequest('not created');
            }
            catch (error) {
                throw error;
            }
        });
    }
    getMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversationId = req.query.conversationId;
                console.log('===================================', req.cookies.userRefreshToken);
                const message = yield this.messageusecase.getMessage(conversationId, req.cookies.userRefreshToken);
                if (message) {
                    res.status(message.status).json({
                        success: message.success,
                        message: message.message,
                        data: message.data
                    });
                }
                errorResponse_1.default.badRequest('not created');
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MessageAdapter = MessageAdapter;
