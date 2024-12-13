import { IReport, IReportItem } from "../../../../domain/report";
import ErrorResponse from "../../../../usecase/handler/errorResponse";
import ReportModel from "../../model/reportModel";

export const createReport = async (
  report: IReportItem,
  reportModel: typeof ReportModel
): Promise<boolean> => {
  try {
    console.log('redslkdslksd',report)
    // Check if a report document already exists
    let reportData = await reportModel.findOne();
    
    if (reportData) {
      // If it exists, push new items to the reports array
      reportData.reports.push(report);
      await reportData.save();
      return true
    } else {
      // If it doesn't exist, create a new report document
      reportData = new reportModel({ reports: [report] });
      await reportData.save();
      return true
    }

  } catch (error) {
    throw error;
  }
};