import { IEvent } from "./event";

export interface IBooking {
    _id?: string;                    
    user_id?: string;                
    event_id?: string;                
    company_id?: string;              
    booking_date?: Date;           
    payment_status?: string; 
    payment_amount?: string;       
    ticket_type?: string;   
    eventDetails?:IEvent;
  }
  