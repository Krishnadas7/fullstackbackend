import mongoose,{Document,Schema,Model,Types} from "mongoose";
import { IBooking } from "../../../domain/booking";

const bookingSchema : Schema = new Schema<IBooking & Document>(
    {
        user_id:{
            type:Types.ObjectId,
            ref:'users',
            required:true
        },
        company_id:{
            type:Types.ObjectId,
            ref:'companies',
            required:true
        },
        event_id:{
            type:Types.ObjectId,
            ref:'events',
            required:true
        },
        booking_date:{
            type:String
        },
        payment_status:{
            type:String
        },
        payment_amount:{
            type:String
        },
        ticket_type:{
            type:String
        }
    },{
        timestamps:true
    }
)
const BookingModel : Model<IBooking & Document> = mongoose.model<IBooking & Document>(
    'Booking',
    bookingSchema
)
export default BookingModel