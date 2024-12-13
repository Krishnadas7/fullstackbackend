import EventModel from "../../model/eventModel";



export const liveEvents = async (
    companyId: string,
    eventModels: typeof EventModel
) => {
    try {
        const currentDate = new Date();
            console.log('company____id', companyId)
        // Find events that are live based on the current date
        const check = await eventModels.findOne({company_id:companyId})
        console.log('check ',check)
        if(check){
            const events = await eventModels.find({
                company_id: companyId,
                $expr: {
                    $and: [
                        { $lte: [{ $toDate: "$start_date" }, currentDate] },
                        { $gte: [{ $toDate: "$end_date" }, currentDate] }
                    ]
                }
            }).sort({ end_date: 1 }); // Sort by end date
            console.log('events',events)
            return events;
        }
        
        return []
    } catch (error) {
        console.log('error from liveevents',error)
        throw error;
    }
};
