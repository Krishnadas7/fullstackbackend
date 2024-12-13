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
exports.liveEvents = void 0;
const liveEvents = (companyId, eventModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        console.log('company____id', companyId);
        // Find events that are live based on the current date
        const check = yield eventModels.findOne({ company_id: companyId });
        console.log('check ', check);
        if (check) {
            const events = yield eventModels.find({
                company_id: companyId,
                $expr: {
                    $and: [
                        { $lte: [{ $toDate: "$start_date" }, currentDate] },
                        { $gte: [{ $toDate: "$end_date" }, currentDate] }
                    ]
                }
            }).sort({ end_date: 1 }); // Sort by end date
            console.log('events', events);
            return events;
        }
        return [];
    }
    catch (error) {
        console.log('error from liveevents', error);
        throw error;
    }
});
exports.liveEvents = liveEvents;
