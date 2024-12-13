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
exports.sendBulkEmail = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const sendBulkEmail = (eventRepository, nodemailer, eventId, url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const participants = yield eventRepository.findParticipants(eventId);
        if (participants.length > 0) {
            const sendEmail = yield nodemailer.sendBulkEmail(participants, 'We are excited to announce that your registered event is starting now! Join us for an exciting session filled with insights, discussions, and networking opportunities', 'To join the event, simply click on the link above or log in to your account on our platform. We recommend joining a few minutes early to ensure you dont miss any of the action', url);
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: sendEmail
            };
        }
        throw errorResponse_1.default.badRequest('no participants');
    }
    catch (error) {
        throw error;
    }
});
exports.sendBulkEmail = sendBulkEmail;
