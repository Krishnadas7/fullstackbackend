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
exports.todaySales = void 0;
const todaySales = (bookingModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const todaySales = yield bookingModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startOfDay,
                        $lte: endOfDay
                    },
                    payment_status: 'completed' // Ensure only completed payments are counted
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: { $toDouble: "$payment_amount" } } // Convert payment_amount to number and sum it
                }
            }
        ]);
        console.log('result:', todaySales);
        return todaySales.length > 0 ? todaySales[0].totalSales : 0;
    }
    catch (error) {
        throw error;
    }
});
exports.todaySales = todaySales;
