import ConversationModel from "../../model/conversatoinModel"

export const getConversation = async (
  userId:string,
  conversationModels:typeof ConversationModel
) =>{
    try {
         const conversations = await conversationModels.find({
            members:{$in:[userId]},
         }).sort({ updatedAt: -1 }); 
         return conversations
    } catch (error) {
        throw error
    }
}