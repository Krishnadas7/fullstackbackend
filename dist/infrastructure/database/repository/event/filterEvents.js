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
exports.filterEvents = void 0;
const filterEvents = (type, ticket, date, eventModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure the inputs are strings
        if (typeof type !== 'string' || typeof ticket !== 'string' || typeof date !== 'string') {
            throw new Error('type, ticket, and date must be strings');
        }
        const events = yield eventModel.find({
            event_type: { $regex: type, $options: 'i' },
            ticket: { $regex: ticket, $options: 'i' },
            start_date: { $regex: date, $options: 'i' }
        });
        return events;
    }
    catch (error) {
        throw error;
    }
});
exports.filterEvents = filterEvents;
