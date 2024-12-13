import EventModel from "../../model/eventModel";
import { ObjectId } from 'mongodb';

export const allMembers = async (
  eventId: string,
  eventModel: typeof EventModel
) => {
  try {
    const members = await eventModel.aggregate([
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
    return members
  } catch (error) {
    throw error;
  }
};
