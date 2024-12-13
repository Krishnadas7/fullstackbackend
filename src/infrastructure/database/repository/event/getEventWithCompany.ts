import { IEvent } from "../../../../domain/event";
import EventModel from "../../model/eventModel";
export const getEventWithCompany =async ( eventModel:typeof EventModel) =>{
    try {
        const events =await eventModel.aggregate([
            {
                $lookup:{
                    from:'companies',
                    localField:"company_id",
                    foreignField:'_id',
                    as:'companyDetails'
                }
            }
        ])
        return events
    } catch (error) {
        throw error
    }
   
}