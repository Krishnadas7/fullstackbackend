import mongoose,{Document,Model,Schema} from "mongoose";
import { ICompany } from "../../../domain/company";

const companySchema: Schema = new Schema<ICompany & Document>(
    {
        company_name:{
            type:String
        },
        company_email:{
            type:String
        },
        contact_personname:{
            type:String
        },
        contact_personphone:{
            type:String
        },
        company_website:{
            type:String
        },
        company_address:{
            type:String
        },
        is_block:{
            type:Boolean,
            default:false
        },
        state:{
            type:String
        },
        postal_code:{
            type:String
        },
        country:{
            type:String
        },
        industry_type:{
            type:String
        },
        company_description:{
            type:String
        },
        company_logo:{
            type:String
        },
        locality:{
            type:String
        },
        password:{
            type:String
        },
    },{
        timestamps:true
    }
)
const  CompanyModel : Model<ICompany & Document> = mongoose.model<ICompany & Document>('Company',companySchema)
export default CompanyModel