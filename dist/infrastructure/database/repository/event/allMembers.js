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
exports.allMembers = void 0;
const mongodb_1 = require("mongodb");
const allMembers = (eventId, eventModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield eventModel.aggregate([
            { $match: { _id: new mongodb_1.ObjectId(eventId) } },
            {
                $addFields: {
                    registrations: {
                        $map: {
                            input: "$registrations",
                            as: "registration",
                            in: { $toObjectId: "$$registration" }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'registrations',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $project: { userDetails: 1, _id: 0 } }
        ]);
        return members;
    }
    catch (error) {
        throw error;
    }
});
exports.allMembers = allMembers;
