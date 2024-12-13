import { IAdminRepository } from "../../interface/repository/IadminRepository";
import Ijwt from "../../interface/services/Ijwt";
import jwt from 'jsonwebtoken'
import AdminModel from "../../../infrastructure/database/model/adminModel";
import { JwtPayload } from "jsonwebtoken";

export const adminRefreshToken = async (
    adminRepository:IAdminRepository,
    Jwt:Ijwt,
    incomingRefreshToken:string
) =>{
  try {
    const accessTokenKey  = process.env.ACCESS_TOKEN_KEY
      const refreshTokenKey  = process.env.REFRESH_TOKEN_KEY
      if (!incomingRefreshToken) {
        console.log('from error incoming refreshtoken');
        return {
            status:401,
            success:false,
            message:'token is not valid'
        }
    }
    const decoded = jwt.verify(incomingRefreshToken, refreshTokenKey as string) as JwtPayload
    const user = await AdminModel.findOne({_id:decoded.id})
    if(!user){
      return {
        status:401,
            success:false,
            message:'token is not valid'
      }
    }
    const {accessToken,refreshToken} =await Jwt.createJWT(
        user._id,
        user.email,
        "admin",
        user.name
       )
       let obj ={
        accessToken:accessToken,
        refreshToken:refreshToken
       }
       return {
        status:200,
        message:'tokens',
        data:obj,
        success:false
       }
  } catch (error) {
    throw error
  }
}