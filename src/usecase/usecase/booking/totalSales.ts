import ErrorResponse from '../../handler/errorResponse';
import { IBookingRepository } from '../../interface/repository/IbookingRepository';
import { StatusCodes } from "../../../utils/statusCodes"

export const totalSales = async (
    bookingRepository:IBookingRepository
) =>{
   try {
      const totalS = await bookingRepository.totalSales()
      if(totalS){
        return {
            status:StatusCodes.OK,
            success:true,
            data:totalS,
            message:'Today Sales'
        }
      }
      throw ErrorResponse.badRequest('something wrong in total sales')
   } catch (error) {
    throw error
   }
}