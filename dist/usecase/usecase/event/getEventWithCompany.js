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
exports.getEventWithCompany = void 0;
const statusCodes_1 = require("../../../utils/statusCodes");
const getEventWithCompany = (eventRepository, s3service, s3) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield eventRepository.getEventWithCompany();
        // const urlPromises = events?.map(async(event:IEvent)=>{
        //   try {
        //     if(event && event._id){
        //       const eventId=event._id.toString()
        //     const url = await s3service.getImages(s3,eventId as string)
        //     event.event_poster=url
        //     }
        //   } catch (error) {
        //     event.event_poster=''
        //   }
        // })
        // await Promise.all(urlPromises)
        return {
            status: statusCodes_1.StatusCodes.OK,
            success: true,
            message: 'all events',
            data: events
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getEventWithCompany = getEventWithCompany;
