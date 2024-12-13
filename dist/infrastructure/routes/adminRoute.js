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
const express_1 = __importDefault(require("express"));
const adminInjection_1 = require("./injections/adminInjection");
const eventInjections_1 = require("./injections/eventInjections");
const bookingInjection_1 = require("./injections/bookingInjection");
const companyInjection_1 = require("./injections/companyInjection");
const authMiddleware_1 = __importDefault(require("../Middleware/authMiddleware"));
const router = express_1.default.Router();
router.post('/admin-login', (req, res, next) => {
    adminInjection_1.adminAdapter.loginAdmin(req, res, next);
});
router.post('/refresh-token', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    adminInjection_1.adminAdapter.adminRefreshToken(req, res, next);
}));
router.get('/get-user', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    adminInjection_1.adminAdapter.getUsers(req, res, next);
});
router.patch('/user/block-unblock', authMiddleware_1.default.protectAdmin, (req, res, next) => adminInjection_1.adminAdapter.blockUnblock(req, res, next));
router.get('/get-events-with-company', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    eventInjections_1.eventAdapter.eventWithCompany(req, res, next);
});
router.patch('/event-block', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    eventInjections_1.eventAdapter.blockEvent(req, res, next);
});
router.get('/all-company', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    companyInjection_1.companyAdapter.getAllCompany(req, res, next);
});
router.patch('/block-company', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    companyInjection_1.companyAdapter.blockCompany(req, res, next);
});
router.get('/users-count', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    adminInjection_1.adminAdapter.userCount(req, res, next);
});
router.get('/event-count', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    adminInjection_1.adminAdapter.eventCount(req, res, next);
});
router.get('/live-event-count', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    adminInjection_1.adminAdapter.liveEventCount(req, res, next);
});
router.get('/pie-chart-data', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    adminInjection_1.adminAdapter.piechartData(req, res, next);
});
router.get('/filter-users', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    adminInjection_1.adminAdapter.filterUser(req, res, next);
});
router.get('/today-sales', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    bookingInjection_1.bookingAdapter.todaySales(req, res, next);
});
router.get('/total-sales', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    bookingInjection_1.bookingAdapter.totalSales(req, res, next);
});
router.get('/filter-sales-report', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    bookingInjection_1.bookingAdapter.filterSalesReport(req, res, next);
});
router.get('/complete-report', authMiddleware_1.default.protectAdmin, (req, res, next) => {
    adminInjection_1.adminAdapter.completeReport(req, res, next);
});
exports.default = router;
