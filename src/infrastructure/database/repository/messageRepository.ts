import { IMessages } from "../../../domain/messages";
import { IMessageRepository } from "../../../usecase/interface/repository/ImessageRepository";
import MessageModel from "../model/messageModel";
import { createMessage } from "./message/createMessage";
import { getMessage } from "./message/getMessage";

export class MessageRepository implements IMessageRepository{
   constructor(private readonly messageModels:typeof MessageModel){}
     async createMessage(message:IMessages): Promise<IMessages> {
        return createMessage(message,this.messageModels)
    }
    async getMessage(conversationId: string): Promise<unknown> {
        return getMessage(conversationId,this.messageModels)
    }
}