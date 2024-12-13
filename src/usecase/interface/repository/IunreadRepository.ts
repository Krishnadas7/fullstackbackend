import { IUnreadCount } from "../../../domain/unreadCount";

export interface IUnreadRepository{
    addChatNotification(senderId:string,receiverId:string):Promise<unknown>;
    getUserNotifications(userId:string):Promise<unknown>;
    removeChatNotification(senderId:string,receiverId:string):Promise<unknown>;
}