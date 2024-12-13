import { IConversation } from "../../../domain/conversation"

export interface IConversationRepostitory{
    addConversation(senderId:string,receiverId:string):Promise<IConversation>;
    getConversation(userId:string):Promise<unknown>;
}