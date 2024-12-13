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
const companySchema = new mongoose_1.Schema({
    company_name: {
        type: String
    },
    company_email: {
        type: String
    },
    contact_personname: {
        type: String
    },
    contact_personphone: {
        type: String
    },
    company_website: {
        type: String
    },
    company_address: {
        type: String
    },
    is_block: {
        type: Boolean,
        default: false
    },
    state: {
        type: String
    },
    postal_code: {
        type: String
    },
    country: {
        type: String
    },
    industry_type: {
        type: String
    },
    company_description: {
        type: String
    },
    company_logo: {
        type: String
    },
    locality: {
        type: String
    },
    password: {
        type: String
    },
}, {
    timestamps: true
});
const CompanyModel = mongoose_1.default.model('Company', companySchema);
exports.default = CompanyModel;
