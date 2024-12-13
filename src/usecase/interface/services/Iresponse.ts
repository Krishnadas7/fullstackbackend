import { IEvent } from "../../../domain/event";
import { IUser } from "../../../domain/user";
import mongoose,{Types} from "mongoose";
export interface StoreData{
    _id?: string;
    name?: string;
    first_name?:string;
    last_name?:string;
    email? : string;
    mobile?:string;
    token?:string;
    bio?:string;
    qualification?:string;
    socialmedialink1?:string;
    socialmedialink2?:string;
    profileImg?:string;
    userAccessToken?:string;
    userRefreshToken?:string;
    adminAccessToken?:string;
    adminRefreshToken?:string,
}
export interface EventStoreData{
    _id?:string;
    event_name?:string;
    event_type?:string;
    start_date?:string;
    end_date?:string;
    starting_time?:string;
    ending_time?:string;
    users_limit?:string;
    event_description?:string;
    event_poster?:string;
}
export interface EventStoreData {
    _id?:string;
    event_name?:string;
    event_type?:string;
    start_date?:string;
    starting_time?:string;
    end_date?:string;
    ending_time?:string;
    users_limit?:string;
    event_description?:string;
    is_block?:boolean;
    company_id?:Types.ObjectId; 
}
export interface IEResponse<T = EventStoreData | string>{
    status : number,
    success : boolean,
    message ?: string,
    data?: T,
}

export interface CompanyData{
    _id?:string;
    company_name?:string;
    company_email?:string;
    companyAccessToken?:string;
    companyRefreshToken?:string;
}
export interface BookingData{
    _id?: string;                    
    user_id?: string;                 
    event_id?: string;               
    company_id?: string;           
    booking_date?: string;         
    payment_status?: string; 
    payment_amount?: string;      
    ticket_type?: string;
}
export interface ConversationData{
    _id?:string;
    members?:string[];
}
export interface MessageData{
    _id?:string;
    conversationId?:string;
    sender:string;
    text:string;
}
export interface ICONdata<T = ConversationData| string>{
    status:number,
    success:boolean,
    message?:string,
    data?:T
}
export interface ICResponse<T= CompanyData | string|unknown>{
    status:number,
    success: boolean,
    message?:string,
    data?:T,
    companyAccessToken?:string,
    companyRefreshToken?:string
}
export interface IResponse<T = StoreData | number | string | ConversationData | MessageData |IEvent[]|BookingData|boolean>{
  status : number,
  success : boolean,
  message ?: string,
  data?: T,
  password?:string,
  userAccessToken?:string,
  userRefreshToken? : string,
  adminAccessToken?:string,
  adminRefreshToken?:string
}

export interface IUserResponse<T = IUser|IUser[]|string>{
  status:number,
  success:boolean,
  message?:string,
  data?:T,
  token?:string
}

export interface IforgotPassword {
  email : string;
  password : string
}