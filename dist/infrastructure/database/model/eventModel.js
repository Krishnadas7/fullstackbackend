"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const eventSchema = new mongoose_1.Schema({
    event_name: {
        type: String
    },
    event_type: {
        type: String
    },
    start_date: {
        type: String
    },
    starting_time: {
        type: String
    },
    end_date: {
        type: String
    },
    ending_time: {
        type: String
    },
    is_block: {
        type: Boolean,
        default: false
    },
    users_limit: {
        type: String
    },
    event_description: {
        type: String
    },
    participants: {
        type: String
    },
    event_poster: {
        type: String
    },
    ticket: {
        type: String
    },
    amount: {
        type: String
    },
    company_id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    registrations: {
        type: [String],
    },
    live: {
        type: String,
        default: 'open'
    }
}, {
    timestamps: true
});
const EventModel = mongoose_1.default.model('Event', eventSchema);
exports.default = EventModel;
