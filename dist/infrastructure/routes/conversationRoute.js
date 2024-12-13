"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversationInjection_1 = require("./injections/conversationInjection");
const router = express_1.default.Router();
router.post('/', (req, res, next) => {
    console.log('conver route');
    conversationInjection_1.conversationAdapter.addConversation(req, res, next);
});
router.get('/', (req, res, next) => {
    conversationInjection_1.conversationAdapter.getConversation(req, res, next);
});
exports.default = router;
