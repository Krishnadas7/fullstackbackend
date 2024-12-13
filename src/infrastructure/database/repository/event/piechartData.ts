import { PData } from "../../../../utils/typeDatas";
import EventModel from "../../model/eventModel";

export const piechartData = async (
    eventModel:typeof EventModel
) =>{
  try {
    const pData = await eventModel.aggregate([
        {
            $group:{
                _id:'$live',
                count:{$sum:1}
            }
            
        },
        {
            $project: {
              _id: 0,
              name: '$_id',
              value: '$count'
            }
          }
    ])
    return pData
  } catch (error) {
    throw error
  }
}