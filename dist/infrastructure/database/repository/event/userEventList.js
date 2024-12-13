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
exports.userEventList = void 0;
const userEventList = (pagination, eventModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todayDate = new Date();
        const events = yield eventModels.find({
            start_date: { $gt: todayDate.toISOString().split('T')[0] }
        }).sort({ createdAt: -1 }).skip(pagination * 3).limit(3);
        return events;
    }
    catch (error) {
        throw error;
    }
});
exports.userEventList = userEventList;
