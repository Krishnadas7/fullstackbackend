import mongoose,{Document,Model,Schema} from "mongoose";
import { IUser } from "../../../domain/user";

const userSchema: Schema = new Schema<IUser & Document>(
    {
        first_name:{
            type:String,
        },
        last_name:{
            type:String,
        },
        email:{
            type:String,
            required:true,
        },
        team:{
            type:[String],
        },
        mobile:{
            type:String,
            default:''
        },
        is_block:{
            type:Boolean,
            default:false
        },
        is_verified:{
            type:Boolean,
            default:false
        },
        bio:{
            type:String,
        },
        socialmedialink1:{
            type:String
        },
        socialmedialink2:{
            type:String
        },
        place:{
            type:String,
        },
        age:{
            type:Number
        },
        profileImage:{
            type:String
        },
        qualification:{
            type:String
        },      
        password:{
            type:String,
            required:true
        },
        refreshToken:{
            type:String
        }
    },{
        timestamps:true
    }
)

const UserModel : Model<IUser & Document> = mongoose.model<IUser & Document>('User',userSchema)
export default UserModel