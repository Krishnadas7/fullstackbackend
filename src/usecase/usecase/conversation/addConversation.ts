import { IConversationRepostitory } from "../../interface/repository/IconversationRepository";
import { ICONdata } from "../../interface/services/Iresponse";
import { StatusCodes } from "../../../utils/statusCodes"

export const addConversation = async (
    senderId:string,
    receiverId:string,
    conversationRepository:IConversationRepostitory,
):Promise<ICONdata >=>{
   try {
        const newConversation = await conversationRepository.addConversation(senderId,receiverId)
        console.log(newConversation,'new con')
          return {
            status:StatusCodes.OK,
            success:true,
            message:'conversation added',
            data:newConversation
          }
   } catch (error) {
    console.log(error,'new conversation')
    throw error
   }
}