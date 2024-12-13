import EventModel from "../../model/eventModel";

export const liveEventCount = async (
    eventModel:typeof EventModel
):Promise<number> =>{
    try {
        const currentDate = new Date();
        const liveC = await eventModel.find({
            $expr: {
                $and: [
                    { $lte: [{ $toDate: "$start_date" }, currentDate] },
                    { $gte: [{ $toDate: "$end_date" }, currentDate] }
                ]
            } }
        ).countDocuments()
        console.log('liveeeee',liveC)
        return liveC
    } catch (error) {
        throw error
    }
}