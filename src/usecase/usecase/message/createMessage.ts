import { IResponse } from '../../interface/services/Iresponse';
import { IMessageRepository } from "../../interface/repository/ImessageRepository";
import { IUnreadRepository } from '../../interface/repository/IunreadRepository';
import conversationModel from '../../../infrastructure/database/model/conversatoinModel';
import { StatusCodes } from "../../../utils/statusCodes"

export const createMessage = async (
        messageRepository:IMessageRepository,
        unreadRepository:IUnreadRepository,
        conversationId:string,
        sender:string,
        text:string
):Promise<IResponse> =>{
     try {
        let obj={
            conversationId,
            sender,
            text
        }
        const newMessage = await messageRepository.createMessage(obj)
        const conversation = await conversationModel.findOne({_id:conversationId})
        const receiverId = conversation?.members?.find((id)=>id!=sender)
        const notification = await unreadRepository.addChatNotification(sender, receiverId as string)
        return {
            status:StatusCodes.OK,
            success:true,
            message:'new message is created',
            data:newMessage
        }
     } catch (error) {
        throw error
     }
}