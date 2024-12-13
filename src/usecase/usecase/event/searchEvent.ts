import { Is3bucket } from "../../interface/services/Is3Services"
import { S3Client } from "@aws-sdk/client-s3"
import { IEventRepository } from "../../interface/repository/IeventRepository"
import { IEvent } from "../../../domain/event"
import ErrorResponse from "../../handler/errorResponse"
import { IResponse } from "../../interface/services/Iresponse"
import { StatusCodes } from "../../../utils/statusCodes"

export const searchEvent = async (
    eventRepository:IEventRepository,
    s3service:Is3bucket,
    s3:S3Client,
    search:string
):Promise<IResponse>=>{
   try {
    const event:IEvent[] = await eventRepository.searchEvent(search)
    if(event){
            const urlPromise = event.map(async(event:IEvent)=>{
                const url = await s3service.getImages(s3,event.event_poster as string)
                event.event_poster=url
            })
            await Promise.all(urlPromise)
        
            return {
                status:StatusCodes.OK,
                success:true,
                message:'search events',
                data:event
            }
    }
    
    throw ErrorResponse.badRequest('something wrong in search')
   } catch (error) {
    throw error
   }
}