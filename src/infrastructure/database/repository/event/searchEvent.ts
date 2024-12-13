import EventModel from "../../model/eventModel"

export const searchEvent =async (
    search:string,
    eventModel:typeof EventModel
) =>{
  try {
    const event = await eventModel.find({event_name:{$regex:search,$options:'i'}})
    return event
  } catch (error) {
    throw error
  }
}