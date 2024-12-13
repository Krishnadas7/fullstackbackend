import mongoose,{Document,Model,Schema} from "mongoose";
import { IConversation } from "../../../domain/conversation";

const ConversationSchema :Schema = new Schema<IConversation & Document>(
  {
    members: {
      type: [String],
    },
    
  },
  { timestamps: true }
);
const conversationModel : Model<IConversation & Document> = mongoose.model<IConversation & Document>('Conversation',ConversationSchema)
export default conversationModel


