"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// server.js or app.js
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("../routes/userRoute"));
const adminRoute_1 = __importDefault(require("../routes/adminRoute"));
const companyRoute_1 = __importDefault(require("../routes/companyRoute"));
const conversationRoute_1 = __importDefault(require("../routes/conversationRoute"));
const messageRoute_1 = __importDefault(require("../routes/messageRoute"));
const errorHanadler_1 = __importDefault(require("../../usecase/handler/errorHanadler"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// sendingEmail()
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') });
exports.app = (0, express_1.default)();
const ORIGN_URL = process.env.CORS_ORIGN;
exports.app.use((0, cors_1.default)({
    origin: ORIGN_URL,
    credentials: true // Allow cookies to be sent along with requests
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json({ limit: '50mb' }));
exports.app.use(express_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
const USER_API = process.env.USER_API;
exports.app.use(USER_API, userRoute_1.default);
const ADMIN_API = process.env.ADMIN_API;
exports.app.use(ADMIN_API, adminRoute_1.default);
const COMPANY_API = process.env.COMPANY_API;
exports.app.use(COMPANY_API, companyRoute_1.default);
const CONVERSATION_API = process.env.CONVERSATION_API;
exports.app.use(CONVERSATION_API, conversationRoute_1.default);
const MESSAGE_API = process.env.MESSAGE_API;
exports.app.use(MESSAGE_API, messageRoute_1.default);
exports.app.use(errorHanadler_1.default);
// Initialize the Socket.io server
// Listen on a port defined in your environment variables or default to 5000
