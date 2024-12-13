import { IBooking } from "../../../domain/booking";
import { IEvent } from "../../../domain/event";
import { ISalesReport } from "../../../infrastructure/types/salesReport";

export interface IBookingRepository{
  ticketBooking(booking:IBooking):Promise<IBooking>;
  allBookings(userId:string):Promise<IBooking[]>;
  liveChecking(userId:string):Promise<number>;
  liveListing(userId:string):Promise<IBooking[]>;
  todaySales():Promise<number>;
  totalSales():Promise<number>;
  filterSalesReport(pagination:string):Promise<ISalesReport[]>;
}