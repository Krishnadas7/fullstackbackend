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
exports.liveListing = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Types;
const liveListing = (userId, bookingModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        const live = yield bookingModels.aggregate([
            { $match: { user_id: new ObjectId(userId) } },
            { $lookup: {
                    from: 'events',
                    localField: 'event_id',
                    foreignField: '_id',
                    as: 'eventDetails'
                } },
            { $unwind: "$eventDetails" }, // To deconstruct eventDetails array
            {
                $addFields: {
                    "eventDetails.start_date": {
                        $dateFromString: { dateString: "$eventDetails.start_date" }
                    },
                    "eventDetails.end_date": {
                        $dateFromString: { dateString: "$eventDetails.end_date" }
                    }
                }
            },
            {
                $match: {
                    "eventDetails.start_date": { $lte: date },
                    "eventDetails.end_date": { $gte: date },
                }
            },
        ]);
        return live;
    }
    catch (error) {
        throw error;
    }
});
exports.liveListing = liveListing;
