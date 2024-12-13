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
exports.BookingAdapter = void 0;
class BookingAdapter {
    constructor(bookingusecase) {
        this.bookingusecase = bookingusecase;
    }
    ticketBooking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield this.bookingusecase.ticketBooking(req.body);
                console.log('booking-====', booking);
                if (booking) {
                    res.status(booking.status).json({
                        success: booking.success,
                        message: booking.message,
                        data: booking.data
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    allBookings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const booking = yield this.bookingusecase.allBookings(userId);
                if (booking) {
                    res.status(booking.status).json({
                        success: booking.success,
                        message: booking.message,
                        data: booking.data
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    liveChecking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const live = yield this.bookingusecase.liveChecking(userId);
                console.log(live, 'livee');
                res.status(live.status).json({
                    data: live.data,
                    message: live.message,
                    success: live.success
                });
            }
            catch (error) {
                console.log(error, 'dd');
                next(error);
            }
        });
    }
    liveListing(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const live = yield this.bookingusecase.liveListing(userId);
                res.status(live.status).json({
                    data: live.data,
                    message: live.message,
                    success: live.success
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    todaySales(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todayS = yield this.bookingusecase.todaySales();
                todayS &&
                    res.status(todayS.status).json({
                        data: todayS.data,
                        message: todayS.message,
                        success: todayS.success
                    });
            }
            catch (error) {
                next(error);
            }
        });
    }
    totalSales(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalS = yield this.bookingusecase.totalSales();
                totalS &&
                    res.status(totalS.status).json({
                        data: totalS.data,
                        message: totalS.message,
                        success: totalS.success
                    });
            }
            catch (error) {
                next(error);
            }
        });
    }
    filterSalesReport(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pagination = req.query.pagination;
                const fData = yield this.bookingusecase.filterSalesReport(pagination);
                fData &&
                    res.status(fData.status).json({
                        data: fData.data,
                        message: fData.message,
                        success: fData.success
                    });
            }
            catch (error) {
                next(error);
            }
        });
    }
    webhook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Parse the incoming webhook event
                const event = req.body;
                // Check the type of event
                switch (event.type) {
                    case "checkout.session.completed":
                        // Handle charge succeeded event
                        const session = event.data.object;
                        const metadata = session.metadata;
                        const bookingId = metadata.bookingId;
                        const user_id = metadata.user_id;
                        const amount = metadata.amount;
                        const transactionId = event.data.object.payment_intent;
                        yield this.bookingusecase.paymentConfirmation({
                            transactionId,
                            bookingId,
                            user_id,
                            amount,
                        });
                        break;
                    default:
                        console.log(`Unhandled event type: ${event.type}`);
                }
                // Respond with a success message
                res.status(200).json({ received: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.BookingAdapter = BookingAdapter;
