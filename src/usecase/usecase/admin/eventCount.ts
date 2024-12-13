import ErrorResponse from "../../handler/errorResponse";
import { IEventRepository } from "../../interface/repository/IeventRepository";

export const eventCount = async(
    eventRepository:IEventRepository
) =>{
  try {
     const eventCount = await eventRepository.eventCount()
     if(eventCount){
      return {
        status: 200,
        success: true,
        data: eventCount,
        message: 'Users Count'
    };
     }
       throw ErrorResponse.badRequest('error in event Count')
  } catch (error) {
    throw error
  }
}