import { IEvent } from "../../../domain/event";
import { IEventRepository } from "../../interface/repository/IeventRepository";
import { Is3bucket } from '../../interface/services/Is3Services';
import { S3Client } from "@aws-sdk/client-s3";
import { StatusCodes } from "../../../utils/statusCodes"

export const getEventWithCompany = async (
      eventRepository:IEventRepository,
      s3service:Is3bucket,
      s3:S3Client
) =>{
    try {
        const events = await eventRepository.getEventWithCompany()
        // const urlPromises = events?.map(async(event:IEvent)=>{
        //   try {
        //     if(event && event._id){
        //       const eventId=event._id.toString()
        //     const url = await s3service.getImages(s3,eventId as string)
        //     event.event_poster=url
        //     }
            
        //   } catch (error) {
        //     event.event_poster=''
        //   }
        // })
        // await Promise.all(urlPromises)
        return {
            status:StatusCodes.OK,
            success:true,
            message:'all events',
            data:events
        }
    } catch (error) {
        throw error
    }
   
}