import EventModel from "../../model/eventModel";
import { IEvent } from "../../../../domain/event";

export const userEventList =async (
    pagination:number,
    eventModels:typeof EventModel
):Promise<IEvent[]> =>{
    try {
        const todayDate = new Date()
        const events = await eventModels.find({
            start_date: { $gt: todayDate.toISOString().split('T')[0] }
          }).sort({createdAt:-1}).skip(pagination*3).limit(3)
          return events
    } catch (error) {
        throw error
    }
}