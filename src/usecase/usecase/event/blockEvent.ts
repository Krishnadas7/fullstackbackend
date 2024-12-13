import ErrorResponse from "../../handler/errorResponse"
import { IEventRepository } from "../../interface/repository/IeventRepository"
import { StatusCodes } from "../../../utils/statusCodes"

export const blockEvent = async (
    eventRespository:IEventRepository,
    eventId:string
)=>{
 try {
    const blocked = await eventRespository.blockEvent(eventId)
    if(blocked){
        return{
            status:StatusCodes.OK,
            success:true,
            message:'updated successfully',
        }
    }
    throw ErrorResponse.badRequest('blocking error')
 } catch (error) {
    throw error
 }
}