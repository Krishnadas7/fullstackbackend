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
exports.EventUseCaase = void 0;
const createEven_1 = require("./event/createEven");
const getEventWithCompany_1 = require("./event/getEventWithCompany");
const blockEvent_1 = require("./event/blockEvent");
const getEvent_1 = require("./event/getEvent");
const userEventList_1 = require("./event/userEventList");
const selectedEvent_1 = require("./event/selectedEvent");
const searchEvent_1 = require("./event/searchEvent");
const filterEvents_1 = require("./event/filterEvents");
const liveEvents_1 = require("./event/liveEvents");
const allMembers_1 = require("./event/allMembers");
const closeEvent_1 = require("./event/closeEvent");
const sendBulkEmail_1 = require("./event/sendBulkEmail");
class EventUseCaase {
    constructor(eventRepsitory, redis, s3service, s3, nodemailer, cloudinary) {
        this.eventRepository = eventRepsitory,
            this.redis = redis,
            this.s3Service = s3service,
            this.s3 = s3,
            this.nodemailer = nodemailer,
            this.cloudinary = cloudinary;
    }
    createEvent(_a) {
        return __awaiter(this, arguments, void 0, function* ({ participants, event_name, event_type, start_date, starting_time, end_date, ending_time, users_limit, event_description, company_id, event_poster, ticket, amount }) {
            return (0, createEven_1.createEvent)(this.eventRepository, this.s3Service, this.s3, this.cloudinary, participants, event_name, event_type, start_date, starting_time, end_date, ending_time, users_limit, event_description, company_id, event_poster, ticket, amount);
        });
    }
    getEventWithCompany() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getEventWithCompany_1.getEventWithCompany)(this.eventRepository, this.s3Service, this.s3);
        });
    }
    getEvent(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getEvent_1.getEvent)(this.eventRepository, this.s3Service, this.s3, companyId);
        });
    }
    blockEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, blockEvent_1.blockEvent)(this.eventRepository, eventId);
        });
    }
    userEventList(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, userEventList_1.userEventList)(this.eventRepository, this.s3Service, this.s3, pagination);
        });
    }
    selectedEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, selectedEvent_1.selectedEvent)(this.eventRepository, this.s3Service, this.s3, eventId);
        });
    }
    searchEvent(search) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, searchEvent_1.searchEvent)(this.eventRepository, this.s3Service, this.s3, search);
        });
    }
    filterEvents(_a) {
        return __awaiter(this, arguments, void 0, function* ({ type, ticket, date }) {
            return (0, filterEvents_1.filterEvents)(this.eventRepository, this.s3Service, this.s3, type, ticket, date);
        });
    }
    liveEvents(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, liveEvents_1.liveEvents)(this.eventRepository, this.s3Service, this.s3, companyId);
        });
    }
    allMembers(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, allMembers_1.allMembers)(this.eventRepository, this.s3Service, this.s3, eventId);
        });
    }
    closeEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(eventId);
            return (0, closeEvent_1.closeEvent)(this.eventRepository, eventId);
        });
    }
    sendBulkEmail(eventId, url) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, sendBulkEmail_1.sendBulkEmail)(this.eventRepository, this.nodemailer, eventId, url);
        });
    }
}
exports.EventUseCaase = EventUseCaase;
