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
exports.createEvent = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const mongodb_1 = require("mongodb");
const statusCodes_1 = require("../../../utils/statusCodes");
const createEvent = (eventRepository, s3service, s3, cloudinary, participants, event_name, event_type, start_date, starting_time, end_date, ending_time, users_limit, event_description, company_id, event_poster, ticket, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = {
            participants,
            event_name,
            event_type,
            start_date,
            starting_time,
            end_date,
            ending_time,
            users_limit,
            event_description,
            company_id,
            ticket,
            amount
        };
        const newEvent = yield eventRepository.createEvent(event);
        console.log('new event ', newEvent);
        if (newEvent._id) {
            const objectId = new mongodb_1.ObjectId(newEvent._id);
            const name = objectId.toHexString();
            // const imageUpload = await s3service.profileImageUpdate(s3,event_poster,name as string)
            // const posterName = await eventRepository.uploadProfileImage(imageUpload,name)
            const imageU = yield cloudinary.imageUpload(event_poster, newEvent._id);
            console.log('image uplload==', imageU);
            if (imageU) {
                const event = yield eventRepository.findEventById(newEvent._id);
                const urlSetUp = yield cloudinary.getImage(newEvent._id);
                event.event_poster = urlSetUp;
                yield event.save();
                console.log('event======url', urlSetUp);
            }
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: `event created successfully`,
                data: newEvent
            };
        }
        throw errorResponse_1.default.badRequest('something wrong');
    }
    catch (error) {
        throw error;
    }
});
exports.createEvent = createEvent;
