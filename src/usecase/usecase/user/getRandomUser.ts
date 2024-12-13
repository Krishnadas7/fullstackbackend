import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IResponse, StoreData } from "../../interface/services/Iresponse";
import { StatusCodes } from "../../../utils/statusCodes"

export const getRandomUser = async (
 userRepository :IUserRepository,
 userId:string
):Promise<IResponse> =>{
    try {
        console.log('user data................',userId)
        const user = await userRepository.getRandomUser(userId)
    if(user){

        const responsedata : StoreData={
            _id:user._id,
            first_name:user.first_name,
            last_name:user.last_name,
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