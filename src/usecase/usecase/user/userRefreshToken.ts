import UserModel from "../../../infrastructure/database/model/userModel";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import Ijwt from "../../interface/services/Ijwt";
import jwt, { JwtPayload } from 'jsonwebtoken'

export const userRefreshToken = async (
    userRepository:IUserRepository,
    Jwt:Ijwt,
    incomingRefreshToken:string
)=>{
try {
    const accessTokenKey  = process.env.ACCESS_TOKEN_KEY
    const refreshTokenKey  = process.env.REFRESH_TOKEN_KEY
    if (!incomingRefreshToken) {
        return {
            status:401,
            success:false,
            message:'access token is not available'
        }
    }
    const decoded = jwt.verify(incomingRefreshToken, refreshTokenKey as string) as JwtPayload
    const user = await UserModel.findOne({_id:decoded.id})
    if(!user){
        return {
            status:401,
            success:false,
            message:'user is not defined'
        }
      }
      const { accessToken, refreshToken } =await Jwt.createJWT(user._id, user.email as string, "user", user.first_name as string);
      let obj={
        accessToken:accessToken,
        refreshToken:refreshToken
      }
      return {
        status:200,
        success:false,
        data:obj,
        message:'refresh token'
      }
} catch (error) {
    throw error
}
}