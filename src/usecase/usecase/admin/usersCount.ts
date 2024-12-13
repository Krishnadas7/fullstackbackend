import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IResponse } from "../../interface/services/Iresponse";

export const usersCount = async (
    userRepository:IUserRepository
):Promise<IResponse> =>{
    try {
        const usersC = await userRepository.usersCount()
        if(usersC){
            return {
                status: 200,
                success: true,
                data: usersC,
                message: 'Users Count'
            };
        }
        throw ErrorResponse.badRequest('something went wrong in usersCount')
    } catch (error) {
        throw error
        
    }
}