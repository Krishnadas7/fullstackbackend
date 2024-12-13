import UnreadModel from "../../model/unreadModel";

export const addChatNotification = async (
    senderId: string,
    receiverId: string,
    notificationModel: typeof UnreadModel
) => {
    try {
        
        const result = await notificationModel.findOneAndUpdate(
            { user: receiverId },
            {
                $inc: { [`chat.${senderId}`]: 1 }   
            },
            { upsert: true, new: true, setDefaultsOnInsert: true}
        );
        
        return result;
    } catch (error) {
        console.error("Error updating notification:", error);
        throw error;  // Re-throw the error after logging it
    }
};