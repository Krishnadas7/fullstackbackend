import { IUser } from "../../../../domain/user";
import EventModel from "../../model/eventModel"
import { ObjectId } from 'mongodb';

export const findParticipants = async (
    eventId:string,
    eventModel:typeof EventModel
) =>{
  try {
    const participants = await eventModel.aggregate([
        { $match: { _id: new ObjectId(eventId) } },
        {
          $addFields: {
            registrations: {
              $map: {
                input: "$registrations",
                as: "registration",
                in: { $toObjectId: "$$registration" }
              }
            }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'registrations',
            foreignField: '_id',
            as: 'userDetails'
          }
        },
        {$project:{userDetails:1,_id:0}}
      ]);
      const users = participants[0].userDetails.map((user:IUser)=>user.email)
    return users
  } catch (error) {
    throw error 
  }
}