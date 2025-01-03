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
exports.getNotification = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const getNotification = (unreadRepository, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'refreshtokenkey123', (err, res) => {
            if (err) {
                console.log('error from token decoding time', err);
                throw errorResponse_1.default.badRequest('token not verified');
            }
            if (res) {
                return res;
            }
        });
        const notifications = yield unreadRepository.getUserNotifications(decoded.id);
        if (notifications) {
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: 'notification',
                data: notifications
            };
        }
        throw errorResponse_1.default.badRequest('notification failed');
    }
    catch (error) {
        console.log('error from users notification', error);
        throw error;
    }
});
exports.getNotification = getNotification;
