"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationAdapter = void 0;
const conversationAdapter_1 = require("../../../controller/conversationAdapter");
const conversationuseCase_1 = require("../../../usecase/usecase/conversationuseCase");
const conversationRepository_1 = require("../../database/repository/conversationRepository");
const conversatoinModel_1 = __importDefault(require("../../database/model/conversatoinModel"));
const conversationRepository = new conversationRepository_1.ConversationRepository(conversatoinModel_1.default);
const conversationusecase = new conversationuseCase_1.ConversationUseCase(conversationRepository);
const conversationAdapter = new conversationAdapter_1.ConversationAdapter(conversationusecase);
exports.conversationAdapter = conversationAdapter;
