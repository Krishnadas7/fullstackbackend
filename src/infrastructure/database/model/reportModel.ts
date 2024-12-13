import { IReport } from '../../../domain/report';
import mongoose,{Document,Model,Schema} from "mongoose";

const reportSchema: Schema = new Schema<IReport & Document>(
    {
        reports: [
            {
              userEmail: { type: String, required: true },
              report: { type: String, required: true }
            }
          ]
    },
    {
        timestamps:true
    }
)

const ReportModel : Model<IReport & Document> = mongoose.model<IReport & Document>(
    "Reports",
    reportSchema
)
export default ReportModel