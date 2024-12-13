import BookingModel from "../../model/bookingModel";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

export const allBookings = async (
    userId:string,
    bookingModels:typeof BookingModel
) =>{
  try {
    // const bookings = await bookingModels.find({user_id:userId})
    const bookings = await bookingModels.aggregate([
      {$match:{user_id:new ObjectId(userId)}},
      {$lookup:{
        from:'events',
        localField:'event_id',
        foreignField:'_id',
        as:'events'
      }},
      {$unwind:'$events'},
      {$sort:{createdAt:-1}}
    ])
    return bookings
  } catch (error) {
    throw error
  }
} 