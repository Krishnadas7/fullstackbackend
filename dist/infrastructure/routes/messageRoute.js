"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageInjection_1 = require("./injections/messageInjection");
const router = express_1.default.Router();
router.post('/', (req, res, next) => {
    console.log('router from message');
    messageInjection_1.messageAdapter.createMessage(req, res, next);
});
router.get('/', (req, res, next) => {
    messageInjection_1.messageAdapter.getMessage(req, res, next);
});
exports.default = router;
