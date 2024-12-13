import MessageModel from "../../model/messageModel";

export const getMessage = async (
    conversationId:string,
    messageModels:typeof MessageModel
)=>{
try {
    const message = await messageModels.find({conversationId:conversationId})
    return message
} catch (error) {
    throw error
}
}