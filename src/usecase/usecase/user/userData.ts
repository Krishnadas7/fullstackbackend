import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IResponse, StoreData } from "../../interface/services/Iresponse";
import { StatusCodes } from "../../../utils/statusCodes"

export const userData = async (
 userRepository :IUserRepository,
 email:string
):Promise<IResponse> =>{
    try {
        const user = await userRepository.findUser(email)
    if(user){

        const responsedata : StoreData={
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            mobile:user.mobile,
            qualification:user.qualification,
            bio:user.bio,
            socialmedialink1:user.socialmedialink1,
            socialmedialink2:user.socialmedialink2
        }
        return {
            status:StatusCodes.OK,
            success:true,
            message:'this is userdata',
            data:responsedata
        }
    }
    throw ErrorResponse.badRequest('user is not found')
    } catch (error) {
        throw error
    }
    
}