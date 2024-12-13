import { IUnreadCount } from "../../../domain/unreadCount";
import { IUnreadRepository } from "../../../usecase/interface/repository/IunreadRepository";
import UnreadModel from "../model/unreadModel";
import { addChatNotification } from "./unreadCount/addChatNotification";
import { getUserNotifications } from "./unreadCount/getUserNotifications";
import { removeChatNotification } from "./unreadCount/removeChatNotication";

export class UnreadRepository implements IUnreadRepository{
    constructor(private readonly unreadModels:typeof UnreadModel){}
    async addChatNotification(senderId: string, receiverId: string) {
        return addChatNotification(senderId,receiverId,this.unreadModels)
    }
    async getUserNotifications(userId: string) {
        return getUserNotifications(userId,this.unreadModels)
    }
    async removeChatNotification(senderId:string,receiverId:string) {
        return removeChatNotification(senderId,receiverId,this.unreadModels)
    }
    
}