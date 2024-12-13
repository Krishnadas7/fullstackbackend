import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";

export const filterUser = async (
    userRepository:IUserRepository
) =>{
  try {
     const fUsers = await userRepository.filterUsers()
     if(fUsers){
       return {
        status:200,
        success:true,
        message:'filter users data',
        data:fUsers
       }
     }
     throw ErrorResponse.badRequest('something wrong in filter')
  } catch (error) {
    throw error
  }
}