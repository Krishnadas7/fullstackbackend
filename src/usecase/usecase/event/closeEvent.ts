import ErrorResponse from "../../handler/errorResponse";
import { IEventRepository } from "../../interface/repository/IeventRepository";
import { StatusCodes } from "../../../utils/statusCodes"

export const closeEvent = async (
    eventRepository:IEventRepository,
    eventId:string
) =>{
    try {
        const close = await eventRepository.closeEvent(eventId)
        if(close){
            return{
                status:StatusCodes.OK,
                success:true,
                message:'closed successfully',
                data:close
            }
        }
        throw ErrorResponse.badRequest('something in wrong in closing time')
    } catch (error) {
        throw error
    }
}