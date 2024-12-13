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
exports.filterUser = void 0;
const userModel_1 = __importDefault(require("../../model/userModel"));
const filterUser = (userModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const yearlyData = yield userModel.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1 }
            }
        ]);
        const monthlyData = yield userModel_1.default.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);
        const weeklyData = yield userModel_1.default.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$createdAt" }, week: { $week: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.week": 1 }
            }
        ]);
        return { yearlyData, monthlyData, weeklyData };
    }
    catch (error) {
        console.log(error);
    }
});
exports.filterUser = filterUser;
