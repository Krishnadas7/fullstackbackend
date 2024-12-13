import mongoose,{Document,Model,Schema,Types} from "mongoose";
import {IEvent} from '../../../domain/event'
const eventSchema: Schema = new Schema<IEvent & Document>(
    {
        event_name:{
            type:String
        },
        event_type:{
            type:String
        },
        start_date:{
            type:String
        },
        starting_time:{
            type:String
        },
        end_date:{
            type:String
        },
        ending_time:{
            type:String
        },
        is_block:{
            type:Boolean,
            default:false
        },
        users_limit:{
            type:String
        },
        event_description:{
            type:String
        },
        participants:{
            type:String
        },
        event_poster:{
            type:String
        },
        ticket:{
            type:String
        },
        amount:{
            type:String
        },
        company_id: {
            type: Types.ObjectId,
            ref: 'Company',
            required: true
        },
        registrations:{
            type:[String],
        },
        live:{
            type:String,
            default:'open'
        }
    },{
        timestamps:true
    }
)
const  EventModel : Model<IEvent & Document> = mongoose.model<IEvent & Document>('Event',eventSchema)
export default EventModel