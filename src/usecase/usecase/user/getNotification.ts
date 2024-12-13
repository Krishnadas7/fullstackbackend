import { IUnreadRepository } from "../../interface/repository/IunreadRepository"
import jwt from 'jsonwebtoken'
import ErrorResponse from "../../handler/errorResponse"
import { StatusCodes } from "../../../utils/statusCodes"

interface JwtPayload {
    id: string;
}
export const getNotification = async (
    unreadRepository:IUnreadRepository,
    token:string
) =>{
 try {
    const decoded:any =jwt.verify(token,'refreshtokenkey123', (err, res)=> {
        if (err) {
            console.log('error from token decoding time', err);
            throw ErrorResponse.badRequest('token not verified');
        }
        if(res){
            return res
        }
    })
    const notifications = await unreadRepository.getUserNotifications(decoded.id)
    if(notifications){
        return {
            status:StatusCodes.OK,
            success:true,
            message:'notification',
            data:notifications
        }
    }
   throw ErrorResponse.badRequest('notification failed')
 } catch (error) {
    console.log('error from users notification',error)
    throw error
 }
}