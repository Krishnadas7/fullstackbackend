import EventModel from "../../model/eventModel"

export const eventCount = async (
    eventModel:typeof EventModel
) =>{
    try {
       const eventCount = await eventModel.find().countDocuments()
       return eventCount
    } catch (error) {
        throw error
    }
}