import ErrorResponse from '../../handler/errorResponse'
import { IUserRepository } from '../../interface/repository/IuserRepository'
import IHashPassword from '../../interface/services/IhashPassword'
import { IResponse } from '../../interface/services/Iresponse'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { StatusCodes } from "../../../utils/statusCodes"

export const resetPassword = async (
    userRepository:IUserRepository,
    bcrypt:IHashPassword,
    password:string,
    forgotToken:string
):Promise<IResponse> =>{
    try {
        console.log('from res',forgotToken)
        console.log(process.env.FORGOT_TOKEN);
        
        const decoded = jwt.verify(forgotToken, process.env.FORGOT_TOKEN || '') as JwtPayload
         console.log('decode error',decoded)
        const resetP =await userRepository.findUser(decoded.email)
        const newPassword =await bcrypt.createHash(password)
        const updatePassword =await userRepository.updatePassword(newPassword,decoded.email)
        if(updatePassword){
            return {
                status:StatusCodes.OK,
                success:true,
                message:'password updated',
                data:true
            }
        }
        throw ErrorResponse.badRequest('updating failed')
    } catch (error) {
        throw error
    }
}