import BookingModel from "../../model/bookingModel";

export const todaySales = async (
    bookingModel: typeof BookingModel
) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const todaySales = await bookingModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startOfDay,
                        $lte: endOfDay
                    },
                    payment_status: 'completed' // Ensure only completed payments are counted
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: { $toDouble: "$payment_amount" } } // Convert payment_amount to number and sum it
                }
            }
        ]);

        console.log('result:', todaySales);

        return todaySales.length > 0 ? todaySales[0].totalSales : 0;
    } catch (error) {
        throw error;
    }
};
