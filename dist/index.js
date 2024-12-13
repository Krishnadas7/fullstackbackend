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
// server.ts
const app_1 = require("./infrastructure/config/app");
const db_1 = __importDefault(require("./infrastructure/config/db"));
const socketIoServer_1 = __importDefault(require("./infrastructure/config/socketIoServer"));
const http_1 = __importDefault(require("http"));
// import {redisClient} from './infrastructure/config/redis' 
// redisClient.get('companyData')
const PORT = process.env.PORT || 3003; // Ensure the port is correctly set here
const server = http_1.default.createServer(app_1.app);
// Initialize the Socket.io server
(0, socketIoServer_1.default)(server);
const start = () => {
    app_1.app.get('/api/user', (req, res) => {
        res.send('Project started');
    });
    server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Service connected on http://localhost:${PORT}`);
        (0, db_1.default)();
    }));
};
start();
