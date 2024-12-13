import { IBooking } from "../../../domain/booking"
import ErrorResponse from "../../handler/errorResponse"
import { IBookingRepository } from "../../interface/repository/IbookingRepository"
import { IEventRepository } from "../../interface/repository/IeventRepository"
import { IUserRepository } from "../../interface/repository/IuserRepository"
import { IResponse } from "../../interface/services/Iresponse"
import IStripe from "../../interface/services/Istripe"
import { StatusCodes } from "../../../utils/statusCodes"

export const ticketBooking = async (
        eventRepository:IEventRepository,
        bookingRepository:IBookingRepository,
        userRepository:IUserRepository,
        stripe:IStripe,
        user_id:string,
        event_id:string,
        company_id:string,
        payment_status:string,
        payment_amount:string,      
        ticket_type:string,
        team:string[]
):Promise<IResponse> =>{
   try {
      const userExist = await eventRepository.checkingUserExist(user_id,event_id)
      if(!userExist){
        return{
          status:StatusCodes.OK,
          success:true,
          message:'already registerd this event'
        }
      }
      const obj:IBooking={
        user_id,
        event_id,
        company_id,
        booking_date: new Date(),
        payment_status,
        payment_amount,
        ticket_type
      }
      if(team && team.length>2){
        const user = await userRepository.addTeam(team,user_id)
      }
      if(ticket_type=='paid'){
        console.log('enter to paid')
         const res =await stripe.createPaymentIntent(payment_amount,event_id,user_id)
         console.log('hghhh==',res);
         const booking = await bookingRepository.ticketBooking(obj)
        
            if(booking){
              return {
                  status:200,
                  success:true,
                  message:'your booking successfully',
                  data:res.data
              }
            }
      }
      const bookingD = await bookingRepository.ticketBooking(obj)
      if(bookingD){
        return {
            status:200,
            success:true,
            message:'your booking successfully',
            data:bookingD
        }
      }
      throw ErrorResponse.badRequest('Event Booking error')
   } catch (error) {
     throw error
   }
}