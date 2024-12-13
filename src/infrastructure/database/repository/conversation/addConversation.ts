import ConversationModel from "../../model/conversatoinModel";

export const addConversation = async (
  senderId: string,
  receiverId: string,
  conversationModel: typeof ConversationModel
) => {
  try {
    // Check if a conversation already exists
    const existingConversation = await conversationModel.findOne({
      members: { $all: [senderId, receiverId] }
    });

    if (existingConversation) {
      // Return the existing conversation if found
      return existingConversation;
    }

    // Create a new conversation if not found
    const newConversation = await conversationModel.create({
      members: [senderId, receiverId]
    });
    await newConversation.save();
    console.log(newConversation,'new coversation')
    return newConversation;
  } catch (error) {
    throw error;
  }
};
