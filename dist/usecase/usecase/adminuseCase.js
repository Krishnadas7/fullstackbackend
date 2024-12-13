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
exports.AdminUseCase = void 0;
const loginAdmin_1 = require("./admin/loginAdmin");
const getUsers_1 = require("./admin/getUsers");
const blockUser_1 = require("./admin/blockUser");
const usersCount_1 = require("./admin/usersCount");
const eventCount_1 = require("./admin/eventCount");
const liveEventCount_1 = require("./admin/liveEventCount");
const piechartData_1 = require("./admin/piechartData");
const filterUser_1 = require("./admin/filterUser");
const adminRefreshToken_1 = require("./admin/adminRefreshToken");
const completeReport_1 = require("./report/completeReport");
class AdminUseCase {
    constructor(adminRepository, userRepository, eventRepository, bcrypt, jwt, s3service, s3, reportRepository) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.bcrypt = bcrypt;
        this.jwt = jwt;
        this.s3Service = s3service;
        this.s3 = s3;
        this.reportRepository = reportRepository;
    }
    loginAdmin(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            return (0, loginAdmin_1.loginAdmin)(this.adminRepository, this.bcrypt, this.jwt, email, password);
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getUsers_1.getUsers)(this.s3Service, this.s3);
        });
    }
    blockUnblock(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, blockUser_1.blockUnblock)(this.userRepository, _id);
        });
    }
    usersCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, usersCount_1.usersCount)(this.userRepository);
        });
    }
    eventCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, eventCount_1.eventCount)(this.eventRepository);
        });
    }
    liveEventCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, liveEventCount_1.liveEventCount)(this.eventRepository);
        });
    }
    piechartData() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, piechartData_1.piechartData)(this.eventRepository);
        });
    }
    filterUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, filterUser_1.filterUser)(this.userRepository);
        });
    }
    completeReport() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, completeReport_1.completeReport)(this.reportRepository);
        });
    }
    adminRefreshToken(incomingRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, adminRefreshToken_1.adminRefreshToken)(this.adminRepository, this.jwt, incomingRefreshToken);
        });
    }
}
exports.AdminUseCase = AdminUseCase;
