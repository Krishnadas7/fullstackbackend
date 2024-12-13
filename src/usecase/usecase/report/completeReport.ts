import ErrorResponse from "../../handler/errorResponse"
import { IReportRepository } from "../../interface/repository/IReportRepository"
import { StatusCodes } from "../../../utils/statusCodes"

export const completeReport = async(
    reportRepository:IReportRepository
)=>{
    try {
        const reportData = await reportRepository.findReport()
        if(reportData){
            return {
                status:StatusCodes.OK,
                success:true,
                data:reportData,
                message:'all reports'
            }
        }
        throw ErrorResponse.badRequest('error in reports')
    } catch (error) {
        throw error
    }
}