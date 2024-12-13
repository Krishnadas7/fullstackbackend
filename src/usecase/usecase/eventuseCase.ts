import { IEventRepository } from "../interface/repository/IeventRepository";
import { S3Client } from "@aws-sdk/client-s3";
import { Is3bucket } from '../interface/services/Is3Services';
import { IRedis } from "../interface/services/Iredis";
import { createEvent } from "./event/createEven";
import { getEventWithCompany } from "./event/getEventWithCompany";
import {Types} from "mongoose";
import { blockEvent } from "./event/blockEvent";
import { getEvent } from "./event/getEvent";
import { userEventList } from "./event/userEventList";
import { selectedEvent } from "./event/selectedEvent";
import { searchEvent } from "./event/searchEvent";
import { filterEvents } from "./event/filterEvents";
import { liveEvents } from "./event/liveEvents";
import { allMembers } from "./event/allMembers";
import { closeEvent } from "./event/closeEvent";
import { sendBulkEmail } from "./event/sendBulkEmail";
import ICloudinary from "../interface/services/Icloudinary";

import INodemailer from "../interface/services/Inodemailer";

export class EventUseCaase {
  private readonly eventRepository :IEventRepository;
  private readonly redis: IRedis
  private readonly s3Service:Is3bucket;
  private readonly s3:S3Client;
  private readonly nodemailer:INodemailer;
  private readonly cloudinary:ICloudinary;
  constructor(
    eventRepsitory:IEventRepository,
    redis:IRedis,
    s3service:Is3bucket,
    s3:S3Client,
    nodemailer:INodemailer,
    cloudinary:ICloudinary
  ){
    this.eventRepository=eventRepsitory,
    this.redis = redis,
    this.s3Service=s3service,
    this.s3 = s3,
    this.nodemailer=nodemailer,
    this.cloudinary=cloudinary
  }
  async createEvent({
    participants,
    event_name,
    event_type,
    start_date,
    starting_time,
    end_date,
    ending_time,
    users_limit,
    event_description,
    company_id,
    event_poster,
    ticket,
    amount
  }:{
    participants:string;
    event_name:string;
    event_type:string;
    start_date:string;
    starting_time:string;
    end_date:string;
    ending_time:string;
    users_limit:string;
    event_description:string;
    company_id:Types.ObjectId;
    event_poster:Express.Multer.File;
    ticket:string,
    amount:string
  }){
      return createEvent(
        this.eventRepository,
        this.s3Service,
        this.s3,
        this.cloudinary,
        participants,
        event_name,
        event_type,
        start_date,
        starting_time,
        end_date,
        ending_time,
        users_limit,
        event_description,
        company_id,
        event_poster,
        ticket,
        amount
      )
    }
    async getEventWithCompany(){
      return getEventWithCompany(
        this.eventRepository,
        this.s3Service,
        this.s3,
      )
    }
    async getEvent(companyId:string){
      return getEvent(
        this.eventRepository,
        this.s3Service,
        this.s3,
        companyId,
      )
    }
    async blockEvent (eventId:string){
      return blockEvent(
        this.eventRepository,
        eventId
      )
    }
    async userEventList (pagination:number){
      return userEventList(
        this.eventRepository,
        this.s3Service,
        this.s3,
        pagination
      )
    }
    async selectedEvent(eventId:string){
      return selectedEvent(
        this.eventRepository,
        this.s3Service,
        this.s3,
        eventId
      )
    }
    async searchEvent(search:string){
      return searchEvent(
        this.eventRepository,
        this.s3Service,
        this.s3,
        search
      )
    }
    async filterEvents({type,ticket,date}:{type:string,ticket:string,date:string}){
      return filterEvents(
        this.eventRepository,
        this.s3Service,
        this.s3,
        type,
        ticket,
        date
      )
      
    }
    async liveEvents(companyId:string){
      return liveEvents(
       this.eventRepository,
       this.s3Service,
        this.s3,
       companyId
      )
    }
    async allMembers(eventId:string){
      return allMembers(
        this.eventRepository,
        this.s3Service,
        this.s3,
        eventId
      )
    }
    async closeEvent(eventId:string){
      console.log(eventId)
      return closeEvent(
        this.eventRepository,
        eventId
      )
    }
    async sendBulkEmail(eventId:string,url:string){
      return sendBulkEmail(
        this.eventRepository,
        this.nodemailer,
        eventId,
        url
      )
    }
}