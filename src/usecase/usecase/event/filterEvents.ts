import ErrorResponse from "../../handler/errorResponse"
import { IEventRepository } from "../../interface/repository/IeventRepository"
import { IResponse } from "../../interface/services/Iresponse"
import { Is3bucket } from "../../interface/services/Is3Services"
import { S3Client } from "@aws-sdk/client-s3"
import {IEvent} from '../../../domain/event'
import { StatusCodes } from "../../../utils/statusCodes"

export const filterEvents = async(
        eventRepository:IEventRepository,
        s3service:Is3bucket,
        s3:S3Client,
        type:string,
        ticket:string,
        date:string
):Promise<IResponse>=>{
    try {
        console.log(type,ticket,date)
        const events:IEvent[] = await eventRepository.filterEvents(type,ticket,date)
         if(events){
            const urlPromises = events.map(async(event)=>{
                const url = await s3service.getImages(s3,event.event_poster as string)
                event.event_poster=url
            })
            await Promise.all(urlPromises)
            return {
                status:StatusCodes.OK,
                success:true,
                message:'filtered events',
                data:events
            }
         }
         throw ErrorResponse.badRequest('something wrong in filter')
    } catch (error) {
        throw error
    }

}