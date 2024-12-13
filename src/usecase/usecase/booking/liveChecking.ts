import ErrorResponse from "../../handler/errorResponse";
import { IBookingRepository } from "../../interface/repository/IbookingRepository";
import { StatusCodes } from "../../../utils/statusCodes"

export const  liveChecking =async (
    bookingRepository:IBookingRepository,
    userId:string
) =>{
    try {
        const live = await bookingRepository.liveChecking(userId)
        console.log('live in boo')
        if(!isNaN(live)){
            return {
                status:StatusCodes.OK,
                success:true,
                message:'datas',
                data:live
            }
        }
       throw ErrorResponse.badRequest('error in checking')
    } catch (error) {
        throw error
    }
}