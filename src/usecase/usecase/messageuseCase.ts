import { IMessageRepository } from "../interface/repository/ImessageRepository";
import { IUnreadRepository } from "../interface/repository/IunreadRepository";
import { createMessage } from "./message/createMessage";
import { getMessage } from "./message/getMessage";

export class MessageUseCase{
private readonly messageRepository:IMessageRepository
private readonly unreadRepository:IUnreadRepository
constructor(
    messageRepository:IMessageRepository,
    unreadRepository:IUnreadRepository
){
    this.messageRepository=messageRepository
    this.unreadRepository=unreadRepository
}
   async createMessage({
    conversationId,
    sender,
    text,
   }:{
    conversationId:string,
    sender:string,
    text:string
   }) {
    return createMessage(
     this.messageRepository,
     this.unreadRepository,
     conversationId,
     sender,
     text
    )
   }
   async getMessage(conversationId:string,userToken:string){
    return getMessage(
        this.messageRepository,
        this.unreadRepository,
        conversationId,
        userToken
    )
   }
}