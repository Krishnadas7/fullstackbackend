import ErrorResponse from "../../handler/errorResponse";
import { IBookingRepository } from "../../interface/repository/IbookingRepository";
import { StatusCodes } from "../../../utils/statusCodes"

export const filterSalesReport = async (
    bookingRepository:IBookingRepository,
    pagination:string
) =>{
  try {
    const fData = await bookingRepository.filterSalesReport(pagination)
    if(fData){
        return {
            status:StatusCodes.OK,
            success:true,
            data:fData,
            message:'Today Sales'
        }
    }
    throw ErrorResponse.badRequest('wrong in filter sales report')
  } catch (error) {
    throw error
  }
}