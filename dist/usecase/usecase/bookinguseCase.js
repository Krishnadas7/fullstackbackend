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
exports.BookingUseCase = void 0;
const ticketBooking_1 = require("./booking/ticketBooking");
const paymentConfirmation_1 = require("./booking/paymentConfirmation");
const allBooings_1 = require("./booking/allBooings");
const liveChecking_1 = require("./booking/liveChecking");
const liveListing_1 = require("./booking/liveListing");
const todaySales_1 = require("./booking/todaySales");
const totalSales_1 = require("./booking/totalSales");
const filterSalesReport_1 = require("./booking/filterSalesReport");
class BookingUseCase {
    constructor(eventRepository, bookingRepository, userRepository, stripe, s3service, s3) {
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.stripe = stripe;
        this.s3Service = s3service;
        this.s3 = s3;
    }
    ticketBooking(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, event_id, company_id, payment_status, payment_amount, ticket_type, team }) {
            return (0, ticketBooking_1.ticketBooking)(this.eventRepository, this.bookingRepository, this.userRepository, this.stripe, user_id, event_id, company_id, payment_status, payment_amount, ticket_type, team);
        });
    }
    paymentConfirmation(_a) {
        return __awaiter(this, arguments, void 0, function* ({ transactionId, bookingId, user_id, amount }) {
            return (0, paymentConfirmation_1.paymentConfirmation)(this.bookingRepository, transactionId, bookingId, user_id, amount);
        });
    }
    allBookings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, allBooings_1.allBookings)(this.bookingRepository, userId);
        });
    }
    liveChecking(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, liveChecking_1.liveChecking)(this.bookingRepository, userId);
        });
    }
    liveListing(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, liveListing_1.liveListing)(this.bookingRepository, this.s3Service, this.s3, userId);
        });
    }
    todaySales() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, todaySales_1.todaySales)(this.bookingRepository);
        });
    }
    totalSales() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, totalSales_1.totalSales)(this.bookingRepository);
        });
    }
    filterSalesReport(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, filterSalesReport_1.filterSalesReport)(this.bookingRepository, pagination);
        });
    }
}
exports.BookingUseCase = BookingUseCase;
