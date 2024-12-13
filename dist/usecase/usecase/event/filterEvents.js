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
exports.filterEvents = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const filterEvents = (eventRepository, s3service, s3, type, ticket, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(type, ticket, date);
        const events = yield eventRepository.filterEvents(type, ticket, date);
        if (events) {
            const urlPromises = events.map((event) => __awaiter(void 0, void 0, void 0, function* () {
                const url = yield s3service.getImages(s3, event.event_poster);
                event.event_poster = url;
            }));
            yield Promise.all(urlPromises);
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: 'filtered events',
                data: events
            };
        }
        throw errorResponse_1.default.badRequest('something wrong in filter');
    }
    catch (error) {
        throw error;
    }
});
exports.filterEvents = filterEvents;
