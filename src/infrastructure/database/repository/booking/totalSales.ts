import BookingModel from "../../model/bookingModel";


export const totalSales = async (
    bookingModel:typeof BookingModel
) =>{
   try {
    const totalSales = await bookingModel.aggregate([
        {
          $match: {
            payment_status: 'completed' // Ensure only completed payments are counted
          }
        },
        {
          $group: {
            _id: null,
            totalIncome: { $sum: { $toDouble: "$payment_amount" } } // Convert payment_amount to number and sum it
          }
        }
      ]);
  
      console.log('Total Sales:', totalSales[0]);
  
      return totalSales.length > 0 ? totalSales[0].totalIncome : 0;
   } catch (error) {
     throw error
   }
}