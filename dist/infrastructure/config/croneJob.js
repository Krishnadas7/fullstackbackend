"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const croneJob_1 = require("../../usecase/usecase/croneJob/croneJob");
const sample = () => {
    node_cron_1.default.schedule('0 * * * *', () => {
        (0, croneJob_1.sendingEmail)();
    });
};
exports.sample = sample;
