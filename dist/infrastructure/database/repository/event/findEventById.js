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
exports.findEventById = void 0;
const findEventById = (eventId, eventModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield eventModel.findOne({ _id: eventId });
        if (!event) {
            throw new Error('Event not found');
        }
        return event;
        // if(event){
        //     return event
        // }
    }
    catch (error) {
        throw error;
    }
});
exports.findEventById = findEventById;