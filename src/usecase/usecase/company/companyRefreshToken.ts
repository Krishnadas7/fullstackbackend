import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import Ijwt from "../../interface/services/Ijwt";
import jwt, { JwtPayload } from 'jsonwebtoken'
import CompanyModel from "../../../infrastructure/database/model/companyModel";

export const companyRefreshToken = async (
    companyRepository:ICompanyRepository,
    Jwt:Ijwt,
    incomingRefreshToken:string
)=>{
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
    const user=await CompanyModel.findOne({_id:decoded.id})
    if(!user){
        return {
            status:401,
            success:false,
            message:'token is not valid'
        }
    }
    const {accessToken,refreshToken} = await Jwt.createJWT(user._id as string,user.company_email as string,"company",user.company_name as string)
    let obj={
        accessToken:accessToken,
        refreshToken:refreshToken
    }
    return {
        status:200,
        success:true,
        data:obj,
        message:'tokens'
    }
  } catch (error) {
    throw error
  }
}