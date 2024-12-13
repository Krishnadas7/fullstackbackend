import { IEvent } from "../../../../domain/event";
import EventModel from "../../model/eventModel";

export const findEventById = async (
    eventId:string,
    eventModel:typeof EventModel
):Promise<IEvent>=>{
  try {
    const event = await eventModel.findOne({_id:eventId})
    if (!event) {
        throw new Error('Event not found');
      }
    return event
    // if(event){
    //     return event
    // }
  } catch (error) {
    throw error
  }
}
