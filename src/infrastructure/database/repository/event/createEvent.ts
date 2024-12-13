import { IEvent } from "../../../../domain/event";
import EventModel from "../../model/eventModel";

export const createEvent = async (
    eventData:IEvent,
    eventModel:typeof EventModel
) =>{
    try {
        const event = await eventModel.create(eventData)
        await event.save()
        return event
    } catch (error) {
      throw error   
    }
   

  
}