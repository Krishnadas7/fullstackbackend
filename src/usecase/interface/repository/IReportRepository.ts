import { IReport,IReportItem } from "../../../domain/report";

export interface IReportRepository{
    createReport(report:IReportItem):Promise<boolean>;
    findReport():Promise<IReport[]>
}