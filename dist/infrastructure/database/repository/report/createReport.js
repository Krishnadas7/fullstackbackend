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
exports.createReport = void 0;
const createReport = (report, reportModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('redslkdslksd', report);
        // Check if a report document already exists
        let reportData = yield reportModel.findOne();
        if (reportData) {
            // If it exists, push new items to the reports array
            reportData.reports.push(report);
            yield reportData.save();
            return true;
        }
        else {
            // If it doesn't exist, create a new report document
            reportData = new reportModel({ reports: [report] });
            yield reportData.save();
            return true;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.createReport = createReport;
