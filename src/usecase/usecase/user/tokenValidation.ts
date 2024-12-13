import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { StatusCodes } from "../../../utils/statusCodes"
import { IResponse } from "../../interface/services/Iresponse";
import jwt from 'jsonwebtoken'

export const tokenValidation = async (
forgotToken:string
): Promise<IResponse> =>{
    try {
        console.log('sdsdlksdklsdlk===',forgotToken)
        let valid = jwt.verify(forgotToken,process.env.FORGOT_TOKEN||'')
            if(!valid){
                throw ErrorResponse.badRequest('token expired')
            }
        return {
            status:StatusCodes.OK,
            success:true,
            message:'token is there'
        }
    } catch (error) {
        throw error
    }
}