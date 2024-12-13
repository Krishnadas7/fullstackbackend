import { S3Client } from "@aws-sdk/client-s3"
import { IEventRepository } from "../../interface/repository/IeventRepository"
import { Is3bucket } from "../../interface/services/Is3Services"
import INodemailer from "../../interface/services/Inodemailer"
import { IResponse } from "../../interface/services/Iresponse"
import ErrorResponse from "../../handler/errorResponse"
import { StatusCodes } from "../../../utils/statusCodes"


export const sendBulkEmail = async (
  eventRepository:IEventRepository,
  nodemailer:INodemailer,
  eventId:string,
  url:string
):Promise<IResponse> =>{
   try {
      const participants = await eventRepository.findParticipants(eventId)
      if(participants.length>0){
        const sendEmail = await nodemailer.sendBulkEmail(participants,
          'We are excited to announce that your registered event is starting now! Join us for an exciting session filled with insights, discussions, and networking opportunities',
          'To join the event, simply click on the link above or log in to your account on our platform. We recommend joining a few minutes early to ensure you dont miss any of the action',
          url)
        return{
          status:StatusCodes.OK,
          success:true,
          message:sendEmail
        }
      }
      throw ErrorResponse.badRequest('no participants')
      
   } catch (error) {
     throw error
     
   }
}