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
exports.allBookings = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Types;
const allBookings = (userId, bookingModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const bookings = await bookingModels.find({user_id:userId})
        const bookings = yield bookingModels.aggregate([
            { $match: { user_id: new ObjectId(userId) } },
            { $lookup: {
                    from: 'events',
                    localField: 'event_id',
                    foreignField: '_id',
                    as: 'events'
                } },
            { $unwind: '$events' },
            { $sort: { createdAt: -1 } }
        ]);
        return bookings;
    }
    catch (error) {
        throw error;
    }
});
exports.allBookings = allBookings;
