import { IMessages } from "../../../../domain/messages"
import MessageModel from "../../model/messageModel"

export const createMessage = async (
    message:IMessages,
    messageModel:typeof MessageModel
) =>{
    try {
        const newMessage = await messageModel.create(message)
         await newMessage.save()
         return newMessage
    } catch (error) {
        throw error
    }
    

}