import { IMessages } from "../../../domain/messages"
export interface IMessageRepository{
    createMessage(message:IMessages):Promise<IMessages>;
    getMessage(conversationId:string):Promise<unknown>;
}