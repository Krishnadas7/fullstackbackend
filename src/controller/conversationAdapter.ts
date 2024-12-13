import { Next,Res,Req } from "../infrastructure/types/expressTypes";
import { ConversationUseCase } from "../usecase/usecase/conversationuseCase";

export class ConversationAdapter{
private readonly conversationusecase:ConversationUseCase
constructor(conversationusecase:ConversationUseCase){
    this.conversationusecase=conversationusecase
}
 async addConversation(req:Req,res:Res,next:Next){
      try {
        const newConversation = await this.conversationusecase.addConversation(req.body)
        console.log(newConversation,'newccc')
        res.status(newConversation.status).json({
          success:newConversation.success,
          message:newConversation.message,
          data:newConversation.data
        })
      } catch (error) {
        next(error)
      }
 }
 async getConversation(req: Req,res: Res,next: Next){
  console.log(req.query.userId,req.params.userId)
  let userId=req.query.userId
   const conversation = await this.conversationusecase.getConversation(userId as string)
   res.status(conversation.status).json({
      success:conversation.success,
      message:conversation.message,
      data:conversation.data
   })
 }
}