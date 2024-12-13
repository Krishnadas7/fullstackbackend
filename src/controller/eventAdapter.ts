import { EventUseCaase } from "../usecase/usecase/eventuseCase";
import { Next,Res,Req } from "../infrastructure/types/expressTypes";
import ErrorResponse from "../usecase/handler/errorResponse";



export class EventAdapter{
 private readonly eventusecase : EventUseCaase;
 constructor(eventusecase:EventUseCaase){
    this.eventusecase = eventusecase
 }
  async createEvent(req: Req,res: Res,next: Next){
    try {
      
      const event_poster = req.file
      let amount
      if(req.body.ticket_type==='paid'){
        amount=req.body.ticket_amount
      }else{
        amount='0'
      }
      if(event_poster){
        let obj  ={
          participants:req.body.participants,
           event_name:req.body.event_name,
           event_type:req.body.event_type,
           start_date:req.body.start_date,
           starting_time:req.body.starting_time,
           end_date:req.body.end_date,
           ending_time:req.body.ending_time,
           users_limit:req.body.users_limit,
           event_description:req.body.event_description,
           company_id:req.body.company_id,
           event_poster:event_poster,
           ticket:req.body.ticket_type,
           amount:amount
        }
         const newEvent = await this.eventusecase.createEvent(obj)
         console.log('from new events===',newEvent)
          res.status(newEvent.status).json({
           success:newEvent.success,
           message:newEvent.message,
           data:newEvent.data
          })
      }
      throw ErrorResponse.badRequest('creation worng')
    } catch (error) {
      next(error)
    }
  }
  async eventWithCompany (req: Req,res: Res,next: Next){
    try {
       const eventWithCompany = await this.eventusecase.getEventWithCompany()
       res.status(eventWithCompany.status).json({
        success:eventWithCompany.success,
        message:eventWithCompany.message,
        data:eventWithCompany.data
       })
    } catch (error) {
       next(error)
    }
  }
  async blockEvent( req: Req,res: Res, next: Next){
    try {
      const eventId : string = req.body.eventId
      const blocked = await this.eventusecase.blockEvent(eventId)
      res.status(blocked.status).json({
        success:blocked.success,
        message:blocked.message
      })
    } catch (error) {
      next(error)
    }
  }
  async getCompany (req: Req,res: Res,next: Next) {
    try{
      const companyId = req.query.companyId
      const details = await this.eventusecase.getEvent(companyId as string)
      res.status(details.status).json({
        success:details.success,
        message:details.message,
        data:details.data
      })
    }catch(error){
     console.log(error)
    }
  }
  async liveEvents (req: Req,res: Res,next: Next) {
    try{
      const companyId = req.query.companyId
      const events = await this.eventusecase.liveEvents(companyId as string)
      res.status(events.status).json({
        success:events.success,
        message:events.message,
        data:events.data
      })
    }catch(error){
      next(error)
    }
  }
  async userEventList (req: Req,res: Res,next: Next){
     try { 
      let pagination = req.query.pagination as unknown
      
      if(pagination){
        
        const events = await this.eventusecase.userEventList(pagination as number)
       
        if(events){
         res.status(events.status).json({
           success:events.success,
           message:events.message,
           data:events.data
         })
        }
      }
      
     } catch (error) {
       next(error)
     }
  }
  async selectedEvent (req: Req,res: Res,next: Next){
    try {
      const eventId = req.query.eventId
      const event = await this.eventusecase.selectedEvent(eventId as string)
      res.status(event.status).json({
        success:event.success,
        message:event.message,
        data:event.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  async searchEvent (req: Req,res: Res,next: Next){
    try {
      const search = req.query.search
      const event = await this.eventusecase.searchEvent(search as string)
      res.status(event.status).json({
        success:event.success,
        message:event.message,
        data:event.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  async filterEvents(req: Req,res: Res,next: Next){
    try {

      let obj = {
        type: req.query.type as string || '',
        ticket: req.query.ticket as string || '',
        date: req.query.date as string || ''
      };
      const event = await this.eventusecase.filterEvents(obj)
      res.status(event.status).json({
        success:event.success,
        message:event.message,
        data:event.data
      })
    } catch (error) {
      next(error)
    }
  }
  async allMembers(req: Req,res: Res,next: Next){
   try {
    const eventId = req.query.eventId
     const members = await this.eventusecase.allMembers(eventId as string)
     res.status(members.status).json({
      success:members.success,
      message:members.message,
      data:members.data
    })
   } catch (error) {
    next(error)
   }
  }
  async closeEvent(req:Req,res:Res,next:Next){
    try {
      const eventId=req.body.eventId
      const close =  await this.eventusecase.closeEvent(eventId)
      res.status(close.status).json({
        success:close.success,
        message:close.message,
        data:close.data
      })
    } catch (error) {
      next(error)
    }
  }
  async sendBulkEmail(req:Req,res:Res,next:Next){
    try {
      const eventId=req.body.eventId
      const url = req.body.url
      const sendEmail = await this.eventusecase.sendBulkEmail(eventId,url)
      res.status(sendEmail.status).json({
        success:sendEmail.success,
        message:sendEmail.message,
      })
    } catch (error) {
      next(error)
    }
  }
}