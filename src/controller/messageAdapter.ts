import { MessageUseCase } from "../usecase/usecase/messageuseCase";
import { Next,Res,Req } from "../infrastructure/types/expressTypes";
import ErrorResponse from "../usecase/handler/errorResponse";

export class MessageAdapter{
 private readonly messageusecase:MessageUseCase
 constructor(messageusecase:MessageUseCase){
    this.messageusecase=messageusecase
 }
 async createMessage (req: Req,res: Res,next: Next){
     try {
        const newMessage = await this.messageusecase.createMessage(req.body)
        if(newMessage){
        res.status(newMessage.status).json({
            success:newMessage.success,
            message:newMessage.message,
            data:newMessage.data
        })
      }
      ErrorResponse.badRequest('not created')
     } catch (error) {
        throw error
     }
 }
 async getMessage (req: Req,res: Res,next: Next){
    try{
        const conversationId = req.query.conversationId
        console.log('===================================',req.cookies.userRefreshToken)
      const  message= await this.messageusecase.getMessage(conversationId as string,req.cookies.userRefreshToken)
      if(message){
        res.status(message.status).json({
            success:message.success,
            message:message.message,
            data:message.data
        })
      }
      ErrorResponse.badRequest('not created')
    }catch(error){
        throw error
    }
 }
}