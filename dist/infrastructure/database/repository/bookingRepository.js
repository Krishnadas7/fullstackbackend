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
exports.BookingRepository = void 0;
const ticketBooking_1 = require("./booking/ticketBooking");
const allBookings_1 = require("./booking/allBookings");
const liveChecking_1 = require("./booking/liveChecking");
const liveListing_1 = require("./booking/liveListing");
const todaySales_1 = require("./booking/todaySales");
const totalSales_1 = require("./booking/totalSales");
const filterSalesReport_1 = require("./booking/filterSalesReport");
class BookingRepository {
    constructor(bookingModel) {
        this.bookingModel = bookingModel;
    }
    ticketBooking(booking) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, ticketBooking_1.ticketBooking)(booking, this.bookingModel);
        });
    }
    allBookings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, allBookings_1.allBookings)(userId, this.bookingModel);
        });
    }
    liveChecking(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, liveChecking_1.liveChecking)(userId, this.bookingModel);
        });
    }
    liveListing(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, liveListing_1.liveListing)(userId, this.bookingModel);
        });
    }
    todaySales() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, todaySales_1.todaySales)(this.bookingModel);
        });
    }
    totalSales() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, totalSales_1.totalSales)(this.bookingModel);
        });
    }
    filterSalesReport(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, filterSalesReport_1.filterSalesReport)(pagination, this.bookingModel);
        });
    }
}
exports.BookingRepository = BookingRepository;
