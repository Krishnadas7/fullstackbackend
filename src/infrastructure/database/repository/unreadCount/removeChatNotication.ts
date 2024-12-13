import UnreadModel from "../../model/unreadModel";

export const removeChatNotification = async (
    senderId: string,
    receiverId: string,
    notificationModel: typeof UnreadModel,
) => {
    try {
        const updateQuery = { $set: { [`chat.${senderId}`]: 0 } };
        
        const result = await notificationModel.findOneAndUpdate(
            { user: receiverId },
            updateQuery,
            { upsert: true, new: true, setDefaultsOnInsert: true}
        );
        
        return result;
    } catch (error) {
        console.error("Error updating notification:", error);
        throw error;  // Re-throw the error after logging it
    }
};