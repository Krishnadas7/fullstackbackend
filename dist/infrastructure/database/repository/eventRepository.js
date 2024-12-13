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
exports.EventRepository = void 0;
const createEvent_1 = require("./event/createEvent");
const updatePosterName_1 = require("./event/updatePosterName");
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
const findParticipants_1 = require("./event/findParticipants");
const eventCounts_1 = require("./event/eventCounts");
const liveEventCount_1 = require("./event/liveEventCount");
const piechartData_1 = require("./event/piechartData");
const chekingUserExist_1 = require("./event/chekingUserExist");
const findEventById_1 = require("./event/findEventById");
class EventRepository {
    constructor(eventModels) {
        this.eventModels = eventModels;
    }
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, createEvent_1.createEvent)(event, this.eventModels);
        });
    }
    uploadProfileImage(image, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, updatePosterName_1.updatePosterName)(image, id, this.eventModels);
        });
    }
    getEventWithCompany() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getEventWithCompany_1.getEventWithCompany)(this.eventModels);
        });
    }
    blockEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, blockEvent_1.blockEvent)(eventId, this.eventModels);
        });
    }
    getEvent(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getEvent_1.getEvent)(companyId, this.eventModels);
        });
    }
    userEventList(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, userEventList_1.userEventList)(pagination, this.eventModels);
        });
    }
    selectedEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, selectedEvent_1.selectedEvent)(eventId, this.eventModels);
        });
    }
    searchEvent(search) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, searchEvent_1.searchEvent)(search, this.eventModels);
        });
    }
    filterEvents(type, ticket, date) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, filterEvents_1.filterEvents)(type, ticket, date, this.eventModels);
        });
    }
    liveEvents(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, liveEvents_1.liveEvents)(companyId, this.eventModels);
        });
    }
    allMembers(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, allMembers_1.allMembers)(eventId, this.eventModels);
        });
    }
    closeEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, closeEvent_1.closeEvent)(eventId, this.eventModels);
        });
    }
    findParticipants(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, findParticipants_1.findParticipants)(eventId, this.eventModels);
        });
    }
    eventCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, eventCounts_1.eventCount)(this.eventModels);
        });
    }
    liveEventCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, liveEventCount_1.liveEventCount)(this.eventModels);
        });
    }
    piechartData() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, piechartData_1.piechartData)(this.eventModels);
        });
    }
    checkingUserExist(userId, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, chekingUserExist_1.checkingUserExist)(userId, eventId, this.eventModels);
        });
    }
    findEventById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, findEventById_1.findEventById)(eventId, this.eventModels);
        });
    }
}
exports.EventRepository = EventRepository;
