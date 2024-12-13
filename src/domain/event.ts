import mongoose,{Document,Model,Schema,Types} from "mongoose";
import { ICompany } from "./company";

export interface IEvent{
    _id?:string;
    event_name?:string;
    event_type?:string;
    start_date?:string;
    starting_time?:string;
    end_date?:string;
    participants?:string;
    ending_time?:string;
    ticket?:string;
    amount?:string;
    users_limit?:string;
    event_description?:string;
    live?:string;
    registrations?:string[];
    is_block?:boolean;
    event_poster?:string;
    company_id?:Types.ObjectId; 
    companyDetails?:ICompany;
}