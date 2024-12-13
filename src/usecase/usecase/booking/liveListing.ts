import { IBooking } from "../../../domain/booking";
import ErrorResponse from "../../handler/errorResponse";
import { IBookingRepository } from "../../interface/repository/IbookingRepository";
import { Is3bucket } from '../../interface/services/Is3Services';
import { S3Client } from "@aws-sdk/client-s3";
import { StatusCodes } from "../../../utils/statusCodes"


export const liveListing = async(
    bookingRepository:IBookingRepository,
    s3service: Is3bucket,
    s3: S3Client,
    userId:string
) =>{
 try {
        const live = await bookingRepository.liveListing(userId)
        const urlPromise = live?.map(async(details)=>{
            if(details && details.eventDetails){
                const url = await s3service.getImages(s3,details.eventDetails.event_poster as string)
                details.eventDetails.event_poster = url
            }
        
        })
        await Promise.all(urlPromise)
        if(live){
            return {
                status:StatusCodes.OK,
                success:true,
                message:'datas',
                data:live
            }
        }
       throw ErrorResponse.badRequest('something went wrong')
    } catch (error) {
        throw error
    }
}