import { IResponse } from '../../interface/services/Iresponse';
import { IMessageRepository } from '../../interface/repository/ImessageRepository';
import ErrorResponse from '../../handler/errorResponse';
import { IUnreadRepository } from '../../interface/repository/IunreadRepository';
import conversationModel from '../../../infrastructure/database/model/conversatoinModel';
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from "../../../utils/statusCodes"


// Define the interface for your JWT payload
interface CustomJwtPayload extends JwtPayload {
  id: string;
}


export const getMessage = async (
    messageRepository:IMessageRepository,
    unreadRepository:IUnreadRepository,
    conversationId:string,
    userToken:string
):Promise<IResponse>=>{
    try {
        const message = await messageRepository.getMessage(conversationId)
        console.log('usss========================================',message);
        
        const decoded =await  jwt.verify(userToken,'refreshtokenkey123') as CustomJwtPayload;
        const conversation = await conversationModel.findOne({_id:conversationId})
        if(decoded){
            const receiverId = conversation?.members?.find((id)=>id!=decoded.id)
            const deleteCount = await unreadRepository.removeChatNotification(receiverId as string,decoded.id)
        }
        console.log('messages',message)
        if(message){
            return {
                status:StatusCodes.OK,
                success:true,
                message:'message',
                data:message
            }
        }

        throw ErrorResponse.badRequest('no message is left')
    } catch (error) {
        console.log('error in message',error)
        throw error
    }
    

}