import { IBookingRepository } from "../../interface/repository/IbookingRepository";
import { StatusCodes } from "../../../utils/statusCodes"

export const allBookings = async(
  bookingRepository:IBookingRepository,
  userId:string 
) =>{
    try {
        const bookings = await bookingRepository.allBookings(userId)
        return {
            status:StatusCodes.OK,
            success:true,
            message:'booked events',
            data:bookings
        }
    } catch (error) {
        throw error
    }
}