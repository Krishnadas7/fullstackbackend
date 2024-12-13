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
exports.liveEventCount = void 0;
const liveEventCount = (eventModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const liveC = yield eventModel.find({
            $expr: {
                $and: [
                    { $lte: [{ $toDate: "$start_date" }, currentDate] },
                    { $gte: [{ $toDate: "$end_date" }, currentDate] }
                ]
            }
        }).countDocuments();
        console.log('liveeeee', liveC);
        return liveC;
    }
    catch (error) {
        throw error;
    }
});
exports.liveEventCount = liveEventCount;
