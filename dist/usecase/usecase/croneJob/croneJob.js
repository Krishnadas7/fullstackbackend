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
exports.sendingEmail = void 0;
const eventModel_1 = __importDefault(require("../../../infrastructure/database/model/eventModel"));
const nodemailer_1 = __importDefault(require("../../../infrastructure/services/nodemailer"));
const sendingEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date(); // Current date and time
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1); // Set the date to tomorrow
    const tomorrowDateString = tomorrow.toISOString().split('T')[0]; // Tomorrow's date in 'YYYY-MM-DD' format
    const currentTime = currentDate.getTime(); // Current time in milliseconds
    // Calculate the time one hour before the event's starting time
    const oneHourBefore = new Date(currentTime - 60 * 60 * 1000); // One hour before current time
    const data = yield eventModel_1.default.aggregate([
        {
            $addFields: {
                // Create a date object for event start time
                eventStart: {
                    $dateFromString: {
                        dateString: {
                            $concat: [
                                "$start_date",
                                "T",
                                "$starting_time",
                                ":00Z" // Ensure the time is in UTC
                            ]
                        }
                    }
                }
            }
        },
        {
            $match: {
                start_date: tomorrowDateString, // Match events starting tomorrow
            }
        },
        {
            $addFields: {
                registrations: {
                    $map: {
                        input: "$registrations",
                        as: "registration",
                        in: { $toObjectId: "$$registration" }
                    }
                }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'registrations',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        { $unwind: '$userDetails' },
        {
            $project: {
                userEmail: "$userDetails.email",
                _id: 0
            }
        }
    ]);
    // Transform the data to an array of email strings
    const event = data === null || data === void 0 ? void 0 : data.map(item => item.userEmail);
    console.log(event);
    if (event && event.length > 0) {
        const nodemailer = new nodemailer_1.default();
        nodemailer.sendBulkEmail(event, 'Reminder: Your Event is Starting Tomorrow', 'Dear User,\n\nThis is a reminder that your event is starting tomorrow. Please be prepared and ready.\n\nBest regards,\nEvent Team', '');
    }
});
exports.sendingEmail = sendingEmail;
