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
const userInjection_1 = require("./injections/userInjection");
const eventInjections_1 = require("./injections/eventInjections");
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = require("../Middleware/multer");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddleware_1 = __importDefault(require("../Middleware/authMiddleware"));
const bookingInjection_1 = require("./injections/bookingInjection");
const adminInjection_1 = require("./injections/adminInjection");
const envFilePath = path_1.default.resolve(__dirname, '../../../../.env');
dotenv_1.default.config({ path: envFilePath });
const router = express_1.default.Router();
// ======
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const s3AccessKey = process.env.S3_ACCESS_KEY;
const secretKey = process.env.SECRET_ACCESS_KEY;
if (!bucketName || !bucketRegion || !s3AccessKey || !secretKey) {
    throw new Error('Missing required environment variables.');
}
const clientConfig = {
    credentials: {
        accessKeyId: s3AccessKey,
        secretAccessKey: secretKey,
    },
    region: bucketRegion,
};
const s3 = new client_s3_1.S3Client(clientConfig);
router.post('/signup', (req, res, next) => {
    userInjection_1.userAdapter.createUser(req, res, next);
});
router.post('/login', (req, res, next) => {
    userInjection_1.userAdapter.loginUser(req, res, next);
});
router.post('/oauth', (req, res, next) => {
    userInjection_1.userAdapter.googleAuth(req, res, next);
});
router.post('/sendemailfor-forgot', (req, res, next) => {
    userInjection_1.userAdapter.sendEmailForgotPassword(req, res, next);
});
router.post("/forgot-password", (req, res, next) => userInjection_1.userAdapter.fogotPassword(req, res, next));
router.post("/sendEmail", (req, res, next) => userInjection_1.userAdapter.sendEmail(req, res, next));
router.post('/profile-image-update', multer_1.upload.single('image'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    userInjection_1.userAdapter.profileImageUpdate(req, res, next);
}));
router.post("/verifyEmail", (req, res, next) => userInjection_1.userAdapter.emailVerification(req, res, next));
router.post('/refresh-token', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    userInjection_1.userAdapter.userRefreshToken(req, res, next);
}));
router.post('/reset-password', (req, res, next) => {
    userInjection_1.userAdapter.resetPassword(req, res, next);
});
router.post('/token-validation', (req, res, next) => {
    userInjection_1.userAdapter.tokenValidation(req, res, next);
});
router.post('/profile-update', authMiddleware_1.default.protectUser, (req, res, next) => {
    userInjection_1.userAdapter.profileUpdate(req, res, next);
});
router.get('/user-data', (req, res, next) => userInjection_1.userAdapter.userData(req, res, next));
router.get('/random-user-data', authMiddleware_1.default.protectUser, (req, res, next) => {
    userInjection_1.userAdapter.getRandomUser(req, res, next);
});
router.get('/get-image', (req, res, next) => {
    userInjection_1.userAdapter.getImage(req, res, next);
});
router.get('/all-user', authMiddleware_1.default.protectUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    userInjection_1.userAdapter.allUser(req, res, next);
}));
router.get('/event-for-users', authMiddleware_1.default.protectUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    eventInjections_1.eventAdapter.userEventList(req, res, next);
}));
router.get('/selected-event', authMiddleware_1.default.protectUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    eventInjections_1.eventAdapter.selectedEvent(req, res, next);
}));
router.get('/search-event', authMiddleware_1.default.protectUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    eventInjections_1.eventAdapter.searchEvent(req, res, next);
}));
router.get('/filter-events', authMiddleware_1.default.protectUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    eventInjections_1.eventAdapter.filterEvents(req, res, next);
}));
router.post('/ticket-booking', authMiddleware_1.default.protectUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    bookingInjection_1.bookingAdapter.ticketBooking(req, res, next);
}));
router.post('/weebhook', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('webhook route is called');
    bookingInjection_1.bookingAdapter.webhook(req, res, next);
}));
router.get('/all-bookings', authMiddleware_1.default.protectUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('all bookin', req.query.userId);
    bookingInjection_1.bookingAdapter.allBookings(req, res, next);
}));
router.get('/member-exist', authMiddleware_1.default.protectUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    userInjection_1.userAdapter.memberexist(req, res, next);
}));
router.get('/live-checking', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    bookingInjection_1.bookingAdapter.liveChecking(req, res, next);
}));
router.get('/live-listing', authMiddleware_1.default.protectUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    bookingInjection_1.bookingAdapter.liveListing(req, res, next);
}));
router.get('/user-notification', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    userInjection_1.userAdapter.getNotification(req, res, next);
}));
router.get('/landing-page-event-count', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    adminInjection_1.adminAdapter.eventCount(req, res, next);
}));
router.get('/landing-page-live-event-count', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    adminInjection_1.adminAdapter.liveEventCount(req, res, next);
}));
router.post('/create-report', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    userInjection_1.userAdapter.createReport(req, res, next);
}));
exports.default = router;
