import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IResponse } from "../../interface/services/Iresponse";

export const blockUnblock = async (
    userRepository: IUserRepository,
    _id: string
):Promise<IResponse> =>{
    try {
        const block = await userRepository.blockUser(_id)
        return {
         status:200,
         success:true,
         message:'success fully updated'
        }
    } catch (error) {
        throw error
    }
  
}