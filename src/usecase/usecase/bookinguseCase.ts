import { IBookingRepository } from "../interface/repository/IbookingRepository";
import { ticketBooking } from "./booking/ticketBooking";
import { paymentConfirmation } from "./booking/paymentConfirmation";
import IStripe from "../interface/services/Istripe";
import { S3Client } from "@aws-sdk/client-s3";
import { Is3bucket } from '../interface/services/Is3Services';
import { allBookings } from "./booking/allBooings";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { liveChecking } from "./booking/liveChecking";
import { liveListing } from "./booking/liveListing";
import { todaySales } from "./booking/todaySales";
import { totalSales } from "./booking/totalSales";
import { filterSalesReport } from "./booking/filterSalesReport";
import { IEventRepository } from "../interface/repository/IeventRepository";

export class BookingUseCase{
    private readonly eventRepository: IEventRepository
    private readonly bookingRepository: IBookingRepository
    private readonly userRepository:IUserRepository
    private readonly stripe:IStripe
    private readonly s3Service:Is3bucket;
    private readonly s3:S3Client;
    constructor(
        eventRepository: IEventRepository,
        bookingRepository:IBookingRepository,
        userRepository:IUserRepository,
        stripe:IStripe,
        s3service:Is3bucket,
        s3:S3Client
    ){
        this.eventRepository=eventRepository
        this.bookingRepository=bookingRepository
        this.userRepository = userRepository
        this.stripe=stripe
        this.s3Service=s3service
        this.s3=s3
    }
    async ticketBooking({
        user_id,
        event_id,
        company_id,
        payment_status,
        payment_amount,      
        ticket_type,
        team
    }:{
        user_id:string,
        event_id:string,
        company_id:string,
        payment_status:string,
        payment_amount:string,      
        ticket_type:string,
        team:string[],
    }){
      return ticketBooking(
        this.eventRepository,
        this.bookingRepository,
        this.userRepository,
        this.stripe,
        user_id,
        event_id,
        company_id,
        payment_status,
        payment_amount,      
        ticket_type,
        team
      )
    }
    async paymentConfirmation({transactionId,bookingId,user_id,amount}:
        {transactionId:string,bookingId:string,user_id:string,amount:string}){
      return paymentConfirmation(
        this.bookingRepository,
        transactionId,
        bookingId,
        user_id,
        amount
      )
    }
    async allBookings(userId:string){
      return allBookings(
        this.bookingRepository,
        userId
      )
    }
    async liveChecking(userId:string){
      return liveChecking(
        this.bookingRepository,
        userId
      )
    }
    async liveListing(userId:string){
      return liveListing(
        this.bookingRepository,
        this.s3Service,
        this.s3,
        userId
      )
    }
    async todaySales(){
      return todaySales(
        this.bookingRepository
      )
    }
    async totalSales(){
      return totalSales(
        this.bookingRepository
      )
    }
    async filterSalesReport(pagination:string){
      return filterSalesReport(
        this.bookingRepository,
        pagination
      )
    }
}