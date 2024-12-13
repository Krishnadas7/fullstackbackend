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
exports.allBookings = void 0;
const statusCodes_1 = require("../../../utils/statusCodes");
const allBookings = (bookingRepository, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield bookingRepository.allBookings(userId);
        return {
            status: statusCodes_1.StatusCodes.OK,
            success: true,
            message: 'booked events',
            data: bookings
        };
    }
    catch (error) {
        throw error;
    }
});
exports.allBookings = allBookings;
