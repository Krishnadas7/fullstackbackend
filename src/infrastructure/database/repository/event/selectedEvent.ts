import { IEvent } from "../../../../domain/event"
import EventModel from "../../model/eventModel"
import {Types} from 'mongoose'

export const selectedEvent = async (
    eventId:string,
    eventModels:typeof EventModel
) =>{
 try {
    const event = await eventModels.aggregate([
        {
            $match: {
                _id:new Types.ObjectId(eventId) // Assuming _id is of type ObjectId
            }
        },
        {$lookup:{
            from:'companies',
            localField:'company_id',
            foreignField:'_id',
            as:'companyDetails'
        }}
    ])
    return event.length > 0 ? event[0] : null;

 } catch (error) {
    throw error
 }
}