"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unreadModel_1 = __importDefault(require("../../database/model/unreadModel"));
const unreaduseCase_1 = require("../../../usecase/usecase/unreaduseCase");
const unreadRepository_1 = require("../../database/repository/unreadRepository");
const unreadRepository = new unreadRepository_1.UnreadRepository(unreadModel_1.default);
const unreadusecase = new unreaduseCase_1.UnreadUseCase(unreadRepository);
