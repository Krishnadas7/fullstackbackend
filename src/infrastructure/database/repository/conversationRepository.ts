import { IConversation } from "../../../domain/conversation";
import { IConversationRepostitory } from "../../../usecase/interface/repository/IconversationRepository";
import conversationModel from "../model/conversatoinModel";
import { addConversation } from "./conversation/addConversation";
import { getConversation } from "./conversation/getConversation";

export class ConversationRepository implements IConversationRepostitory{
  constructor(private readonly conversationModels: typeof conversationModel){}

 async addConversation(senderId: string, receiverId: string): Promise<IConversation> {
    return addConversation(senderId,receiverId,this.conversationModels)
}
async getConversation(userId: string): Promise<IConversation[] > {
    return getConversation(userId,this.conversationModels)
}
}