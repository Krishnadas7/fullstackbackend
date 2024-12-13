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
exports.userEventList = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const userEventList = (eventRepository, s3service, s3, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield eventRepository.userEventList(pagination);
        // const urlPromises = events.map(async(event:IEvent,index:Number)=>{
        //     if(event && event.event_poster){
        //         try {
        //             const url =  await s3service.getImages(s3,event.event_poster)
        //        event.event_poster=url
        //         } catch (error) {
        //             event.event_poster=''
        //         }
        //     }
        // })
        // await Promise.all(urlPromises);
        if (events) {
            return {
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: 'all events',
                data: events
            };
        }
        throw errorResponse_1.default.badRequest('something error');
    }
    catch (error) {
        throw error;
    }
});
exports.userEventList = userEventList;
