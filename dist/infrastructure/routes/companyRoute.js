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
const companyInjection_1 = require("./injections/companyInjection");
const eventInjections_1 = require("./injections/eventInjections");
const authMiddleware_1 = __importDefault(require("../Middleware/authMiddleware"));
const multer_1 = require("../Middleware/multer");
const router = express_1.default.Router();
router.post('/signup', (req, res, next) => {
    console.log('rotueeeee');
    companyInjection_1.companyAdapter.createCompany(req, res, next);
});
router.post('/login', (req, res, next) => {
    companyInjection_1.companyAdapter.companyLogin(req, res, next);
});
router.post('/send-email', (req, res, next) => {
    companyInjection_1.companyAdapter.sendEmailforCompany(req, res, next);
});
router.get('/get-company-profile', authMiddleware_1.default.protectCompany, (req, res, next) => {
    companyInjection_1.companyAdapter.getCompanyProfile(req, res, next);
});
// In the backend (Express route)
router.post('/company-profile-edit', authMiddleware_1.default.protectCompany, multer_1.upload.single('company_logo'), (req, res, next) => {
    companyInjection_1.companyAdapter.companyProfileUpdate(req, res, next);
});
router.post('/event-creation', authMiddleware_1.default.protectCompany, multer_1.upload.single('event_poster'), (req, res, next) => {
    eventInjections_1.eventAdapter.createEvent(req, res, next);
});
router.get('/get-all-event', (req, res, next) => {
    eventInjections_1.eventAdapter.getCompany(req, res, next);
});
router.get('/live-events', (req, res, next) => {
    eventInjections_1.eventAdapter.liveEvents(req, res, next);
});
router.get('/all-members', (req, res, next) => {
    eventInjections_1.eventAdapter.allMembers(req, res, next);
});
router.post('/close-event', (req, res, next) => {
    eventInjections_1.eventAdapter.closeEvent(req, res, next);
});
router.post('/send-bulk-email', (req, res, next) => {
    eventInjections_1.eventAdapter.sendBulkEmail(req, res, next);
});
router.post('/refresh-token', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    companyInjection_1.companyAdapter.companyRefreshToken(req, res, next);
}));
exports.default = router;
