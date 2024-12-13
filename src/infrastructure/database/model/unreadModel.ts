import { IUnreadCount } from '../../../domain/unreadCount';
import mongoose,{ Schema,Document,Model } from "mongoose";

const unreadSchema :Schema = new Schema<IUnreadCount & Document>(
  {
    user: {
        type: String,
        required: true
    },
    chat: {
        type: Map,
        of: Number,
        default: new Map<string, number>()
    },
    interestReceived: {
        type: [String],
        default: []
    }
},
      { timestamps: true }
    
)

const UnreadModel :Model<IUnreadCount & Document> = mongoose.model<IUnreadCount & Document>('unreadcounts',unreadSchema)
export default UnreadModel