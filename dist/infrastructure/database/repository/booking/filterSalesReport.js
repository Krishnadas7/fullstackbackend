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
exports.filterSalesReport = void 0;
const filterSalesReport = (pagination, bookingModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let num = parseInt(pagination);
        const fData = yield bookingModel.aggregate([
            { $match: { payment_status: 'completed' } },
            { $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'users'
                } },
            { $unwind: '$users' },
            { $lookup: {
                    from: 'companies',
                    localField: 'company_id',
                    foreignField: '_id',
                    as: 'company'
                } },
            { $unwind: '$company' },
            { $lookup: {
                    from: 'events',
                    localField: 'event_id',
                    foreignField: '_id',
                    as: 'events'
                } },
            { $unwind: '$events' },
            {
                $project: {
                    _id: 1,
                    user_name: { $concat: ['$users.first_name', ' ', '$users.last_name'] },
                    event_name: '$events.event_name',
                    company_name: '$company.company_name',
                    booking_date: 1,
                    payment_status: 1,
                    payment_amount: 1,
                    ticket_type: 1
                }
            },
            { $skip: num * 2 },
            { $limit: 2 }
        ]);
        console.log('final----======', fData);
        return fData;
    }
    catch (error) {
        throw error;
    }
});
exports.filterSalesReport = filterSalesReport;
