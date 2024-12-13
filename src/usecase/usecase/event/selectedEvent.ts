import ErrorResponse from "../../handler/errorResponse";
import { IEventRepository } from "../../interface/repository/IeventRepository";
import { Is3bucket } from "../../interface/services/Is3Services";
import { S3Client } from "@aws-sdk/client-s3";
import { StatusCodes } from "../../../utils/statusCodes"


export const selectedEvent = async (
    eventRepository:IEventRepository,
    s3service:Is3bucket,
    s3:S3Client,
    eventId:string
) =>{
    try {
        const event = await eventRepository.selectedEvent(eventId)
        // const url = await s3service.getImages(s3,eventId)
        // event.event_poster = url
        if(event){
            return {
             status:StatusCodes.OK,
             success:true,
             message:'selected event',
             data:event
            }
        }
        throw ErrorResponse.badRequest('wrong in selected event')
    } catch (error) {
        throw error
    }
}