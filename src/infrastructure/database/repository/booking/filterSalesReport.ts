import BookingModel from "../../model/bookingModel";

export const filterSalesReport = async (
    pagination:string,
    bookingModel:typeof BookingModel
) =>{
  try {
    let num = parseInt(pagination)
     const fData = await bookingModel.aggregate([
        {$match:{payment_status:'completed'}},
        {$lookup:{
            from:'users',
            localField:'user_id',
            foreignField:'_id',
            as:'users'
        }},
        {$unwind:'$users'},
        {$lookup:{
            from:'companies',
            localField:'company_id',
            foreignField:'_id',
            as:'company'
        }},
        {$unwind:'$company'},
        {$lookup:{
            from:'events',
            localField:'event_id',
            foreignField:'_id',
            as:'events'
        }},
        {$unwind:'$events'},
        {
            $project: {
              _id: 1,
              user_name: { $concat: ['$users.first_name', ' ', '$users.last_name'] },
              event_name: '$events.event_name',
              company_name: '$company.company_name',
              booking_date: 1,
              payment_status: 1,
              payment_amount: 1,
              ticket_type: 1
            }
          },
          {$skip:num * 2},
          {$limit:2}
     ])
     console.log('final----======',fData)
     return fData
  } catch (error) {
     throw error 
  }
}