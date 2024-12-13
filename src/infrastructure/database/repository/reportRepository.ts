import { createReport } from './report/createReport';
import { IReport,IReportItem } from "../../../domain/report";
import { IReportRepository } from "../../../usecase/interface/repository/IReportRepository";
import ReportModel from "../model/reportModel";
import { findReport } from './report/findReport';

export class ReportRepository implements IReportRepository{
    constructor(private readonly reportModel:typeof ReportModel){}
    async createReport(report: IReportItem): Promise<boolean> {
        return createReport(report,this.reportModel)
    }
    async findReport(): Promise<IReport[]> {
        return findReport(this.reportModel)
    }
}