import { IBooking } from "../../../domain/booking";
import { IBookingRepository } from "../../../usecase/interface/repository/IbookingRepository";
import BookingModel from "../model/bookingModel";
import EventModel from "../model/eventModel";
import { ticketBooking } from "./booking/ticketBooking";
import { allBookings } from "./booking/allBookings";
import { liveChecking } from "./booking/liveChecking";
import { liveListing } from "./booking/liveListing";
import { todaySales } from "./booking/todaySales";
import { totalSales } from "./booking/totalSales";
import { ISalesReport } from "../../types/salesReport";
import { filterSalesReport } from "./booking/filterSalesReport";
import { IEvent } from "../../../domain/event";

export class BookingRepository implements IBookingRepository{
   
    constructor(private readonly bookingModel:typeof BookingModel,
        
    ){
        
    }
    async ticketBooking(booking: IBooking): Promise<IBooking> {
        return ticketBooking(booking,this.bookingModel)
    }
    async allBookings(userId: string): Promise<IBooking[]> {
        return allBookings(userId,this.bookingModel)
    }
    async liveChecking(userId: string): Promise<number> {
        return liveChecking(userId,this.bookingModel)
    }
    async liveListing(userId: string): Promise<IBooking[]> {
        return liveListing(userId,this.bookingModel)
    }
    async todaySales(): Promise<number> {
        return todaySales(this.bookingModel)
    }
    async totalSales(): Promise<number> {
        return totalSales(this.bookingModel)
    }
    async filterSalesReport(pagination: string): Promise<ISalesReport[]> {
        return filterSalesReport(pagination,this.bookingModel)
    }
}