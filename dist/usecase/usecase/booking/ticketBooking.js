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
exports.ticketBooking = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const ticketBooking = (eventRepository, bookingRepository, userRepository, stripe, user_id, event_id, company_id, payment_status, payment_amount, ticket_type, team) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExist = yield eventRepository.checkingUserExist(user_id, event_id);
        if (!userExist) {
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: 'already registerd this event'
            };
        }
        const obj = {
            user_id,
            event_id,
            company_id,
            booking_date: new Date(),
            payment_status,
            payment_amount,
            ticket_type
        };
        if (team && team.length > 2) {
            const user = yield userRepository.addTeam(team, user_id);
        }
        if (ticket_type == 'paid') {
            console.log('enter to paid');
            const res = yield stripe.createPaymentIntent(payment_amount, event_id, user_id);
            console.log('hghhh==', res);
            const booking = yield bookingRepository.ticketBooking(obj);
            if (booking) {
                return {
                    status: 200,
                    success: true,
                    message: 'your booking successfully',
                    data: res.data
                };
            }
        }
        const bookingD = yield bookingRepository.ticketBooking(obj);
        if (bookingD) {
            return {
                status: 200,
                success: true,
                message: 'your booking successfully',
                data: bookingD
            };
        }
        throw errorResponse_1.default.badRequest('Event Booking error');
    }
    catch (error) {
        throw error;
    }
});
exports.ticketBooking = ticketBooking;
