import UnreadModel from "../../model/unreadModel";

export const getUserNotifications = async (
    userId: string,
    notificationModel: typeof UnreadModel
) => {
    try {
        const notifications = await notificationModel.findOne({ user: userId });
        console.log('noti user vai',notifications)
        return notifications;
    } catch (error) {
        console.log('error from repso noti')
        throw error
    }
   
}