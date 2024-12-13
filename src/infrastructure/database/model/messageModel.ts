import mongoose,{ Schema,Document,Model } from "mongoose";
import { IMessages } from "../../../domain/messages";


const messageSchema : Schema = new Schema<IMessages & Document>(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const MessageModel : Model<IMessages & Document > = mongoose.model<IMessages & Document>('messages',messageSchema)
export default MessageModel