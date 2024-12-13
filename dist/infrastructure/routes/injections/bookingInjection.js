"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingAdapter = void 0;
const bookingAdapter_1 = require("../../../controller/bookingAdapter");
const bookinguseCase_1 = require("../../../usecase/usecase/bookinguseCase");
const bookingModel_1 = __importDefault(require("../../database/model/bookingModel"));
const userModel_1 = __importDefault(require("../../database/model/userModel"));
const bookingRepository_1 = require("../../database/repository/bookingRepository");
const userRepository_1 = require("../../database/repository/userRepository");
const stripe_1 = __importDefault(require("../../services/stripe"));
const s3services_1 = require("../../services/s3services");
const awsS3_1 = require("../../config/awsS3");
const eventModel_1 = __importDefault(require("../../database/model/eventModel"));
const eventRepository_1 = require("../../database/repository/eventRepository");
const bookingRepository = new bookingRepository_1.BookingRepository(bookingModel_1.default);
const userRepository = new userRepository_1.UserRepository(userModel_1.default);
const eventRepository = new eventRepository_1.EventRepository(eventModel_1.default);
const stripe = new stripe_1.default();
const s3service = new s3services_1.S3services();
const bookingusecase = new bookinguseCase_1.BookingUseCase(eventRepository, bookingRepository, userRepository, stripe, s3service, awsS3_1.s3);
const bookingAdapter = new bookingAdapter_1.BookingAdapter(bookingusecase);
exports.bookingAdapter = bookingAdapter;
