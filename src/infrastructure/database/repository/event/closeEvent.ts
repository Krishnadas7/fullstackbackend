import EventModel from "../../model/eventModel";

export const closeEvent = async (
    eventId:string,
    eventModel:typeof EventModel
):Promise<boolean> =>{
    try {
        const close = await eventModel.findOneAndUpdate({_id:eventId},{$set:{live:'closed'}})
        console.log(close)
        if(close){
            return true
        }else{
            return false
        }
    } catch (error) {
        throw error
    }
}