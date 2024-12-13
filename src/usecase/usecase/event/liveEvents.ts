import ErrorResponse from '../../handler/errorResponse';
import { IEventRepository } from '../../interface/repository/IeventRepository';
import { Is3bucket } from '../../interface/services/Is3Services';
import { S3Client } from '@aws-sdk/client-s3';
import { StatusCodes } from "../../../utils/statusCodes"

export const liveEvents = async(
    eventRepository:IEventRepository,
    s3service:Is3bucket,
    s3:S3Client,
    companyId:string
) =>{
    try {
        const events = await eventRepository.liveEvents(companyId as string)
        // const urlPromise = events?.map(async(event)=>{
        //     const url = await s3service.getImages(s3,event.event_poster as string)
        //     event.event_poster=url
        // })
        // await Promise.all(urlPromise)
        if(events){
            return {
                status:StatusCodes.OK,
                success:true,
                message:'live events',
                data:events
            }
        }
       throw ErrorResponse.badRequest('somethign error')
    } catch (error) {
        throw error
    }
}