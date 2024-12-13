import ReportModel from "../../model/reportModel"

export const findReport = async (
    reportModel:typeof ReportModel
) =>{
    try {
        const reportData = await reportModel.find()
        return reportData
    } catch (error) {
        throw error
    }
}