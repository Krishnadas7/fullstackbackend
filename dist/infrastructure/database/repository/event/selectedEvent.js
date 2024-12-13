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
exports.selectedEvent = void 0;
const mongoose_1 = require("mongoose");
const selectedEvent = (eventId, eventModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield eventModels.aggregate([
            {
                $match: {
                    _id: new mongoose_1.Types.ObjectId(eventId) // Assuming _id is of type ObjectId
                }
            },
            { $lookup: {
                    from: 'companies',
                    localField: 'company_id',
                    foreignField: '_id',
                    as: 'companyDetails'
                } }
        ]);
        return event.length > 0 ? event[0] : null;
    }
    catch (error) {
        throw error;
    }
});
exports.selectedEvent = selectedEvent;
