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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRepository = void 0;
const createReport_1 = require("./report/createReport");
const findReport_1 = require("./report/findReport");
class ReportRepository {
    constructor(reportModel) {
        this.reportModel = reportModel;
    }
    createReport(report) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, createReport_1.createReport)(report, this.reportModel);
        });
    }
    findReport() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, findReport_1.findReport)(this.reportModel);
        });
    }
}
exports.ReportRepository = ReportRepository;
