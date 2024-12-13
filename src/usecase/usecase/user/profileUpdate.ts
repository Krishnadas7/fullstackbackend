import { StoreData } from "../../interface/services/Iresponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import ErrorResponse from "../../handler/errorResponse";
import jwt from 'jsonwebtoken'
import { StatusCodes } from "../../../utils/statusCodes"

interface JwtPayload {
    id:string;
}

export const updateProfile = async (
    userRepository:IUserRepository,
    first_name:string,
    last_name:string,
    bio:string,
    qualification:string,
    socialmedialink1:string,
    socialmedialink2:string,
    token:string
) =>{
    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_KEY as string)  as JwtPayload
        console.log('decoded',decoded);
        if(decoded){
        let id = decoded.id
        const user = await userRepository.updateProfile(first_name,last_name,qualification,bio,socialmedialink1,socialmedialink2,id)
        const responsedata : StoreData={
            _id:user?._id,
            first_name:user?.first_name,
            last_name:user?.last_name,
            qualification:user?.qualification,
            bio:user?.bio,
            socialmedialink1:user?.socialmedialink1,
            socialmedialink2:user?.socialmedialink2,
            email:user?.email,
            mobile:user?.mobile,
        }
        return {
          status:StatusCodes.OK,
          success:true,
          message:'user updated success fully',
          data:responsedata
        }
     }
     throw ErrorResponse.badRequest('something went wrong')
    } catch (error) {
        throw error
    }
 
}