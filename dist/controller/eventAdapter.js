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
exports.EventAdapter = void 0;
const errorResponse_1 = __importDefault(require("../usecase/handler/errorResponse"));
class EventAdapter {
    constructor(eventusecase) {
        this.eventusecase = eventusecase;
    }
    createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event_poster = req.file;
                let amount;
                if (req.body.ticket_type === 'paid') {
                    amount = req.body.ticket_amount;
                }
                else {
                    amount = '0';
                }
                if (event_poster) {
                    let obj = {
                        participants: req.body.participants,
                        event_name: req.body.event_name,
                        event_type: req.body.event_type,
                        start_date: req.body.start_date,
                        starting_time: req.body.starting_time,
                        end_date: req.body.end_date,
                        ending_time: req.body.ending_time,
                        users_limit: req.body.users_limit,
                        event_description: req.body.event_description,
                        company_id: req.body.company_id,
                        event_poster: event_poster,
                        ticket: req.body.ticket_type,
                        amount: amount
                    };
                    const newEvent = yield this.eventusecase.createEvent(obj);
                    console.log('from new events===', newEvent);
                    res.status(newEvent.status).json({
                        success: newEvent.success,
                        message: newEvent.message,
                        data: newEvent.data
                    });
                }
                throw errorResponse_1.default.badRequest('creation worng');
            }
            catch (error) {
                next(error);
            }
        });
    }
    eventWithCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventWithCompany = yield this.eventusecase.getEventWithCompany();
                res.status(eventWithCompany.status).json({
                    success: eventWithCompany.success,
                    message: eventWithCompany.message,
                    data: eventWithCompany.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    blockEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = req.body.eventId;
                const blocked = yield this.eventusecase.blockEvent(eventId);
                res.status(blocked.status).json({
                    success: blocked.success,
                    message: blocked.message
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyId = req.query.companyId;
                const details = yield this.eventusecase.getEvent(companyId);
                res.status(details.status).json({
                    success: details.success,
                    message: details.message,
                    data: details.data
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    liveEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyId = req.query.companyId;
                const events = yield this.eventusecase.liveEvents(companyId);
                res.status(events.status).json({
                    success: events.success,
                    message: events.message,
                    data: events.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    userEventList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pagination = req.query.pagination;
                if (pagination) {
                    const events = yield this.eventusecase.userEventList(pagination);
                    if (events) {
                        res.status(events.status).json({
                            success: events.success,
                            message: events.message,
                            data: events.data
                        });
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    selectedEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = req.query.eventId;
                const event = yield this.eventusecase.selectedEvent(eventId);
                res.status(event.status).json({
                    success: event.success,
                    message: event.message,
                    data: event.data
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    searchEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const search = req.query.search;
                const event = yield this.eventusecase.searchEvent(search);
                res.status(event.status).json({
                    success: event.success,
                    message: event.message,
                    data: event.data
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    filterEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let obj = {
                    type: req.query.type || '',
                    ticket: req.query.ticket || '',
                    date: req.query.date || ''
                };
                const event = yield this.eventusecase.filterEvents(obj);
                res.status(event.status).json({
                    success: event.success,
                    message: event.message,
                    data: event.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    allMembers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = req.query.eventId;
                const members = yield this.eventusecase.allMembers(eventId);
                res.status(members.status).json({
                    success: members.success,
                    message: members.message,
                    data: members.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    closeEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = req.body.eventId;
                const close = yield this.eventusecase.closeEvent(eventId);
                res.status(close.status).json({
                    success: close.success,
                    message: close.message,
                    data: close.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    sendBulkEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = req.body.eventId;
                const url = req.body.url;
                const sendEmail = yield this.eventusecase.sendBulkEmail(eventId, url);
                res.status(sendEmail.status).json({
                    success: sendEmail.success,
                    message: sendEmail.message,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.EventAdapter = EventAdapter;
