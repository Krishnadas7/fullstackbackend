import { IResponse } from "../../interface/services/Iresponse";
import { IConversationRepostitory } from "../../interface/repository/IconversationRepository";
import ErrorResponse from "../../handler/errorResponse";
import { StatusCodes } from "../../../utils/statusCodes"

export const getConversation = async (
    userId:string,
    conversationRepository:IConversationRepostitory
):Promise<IResponse> =>{
    try {
        const conversation  = await conversationRepository.getConversation(userId)
        if(conversation){
        return {
            status:StatusCodes.OK,
            success:true,
            message:'new conversations',
            data:conversation
        }
    }
    throw ErrorResponse.badRequest('error in conversation')
    } catch (error) {
        throw error
    }
    
}