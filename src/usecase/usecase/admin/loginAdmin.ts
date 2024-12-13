import { IAdmin } from "../../../domain/admin";
import { IAdminRepository } from "../../interface/repository/IadminRepository";
import IHashPassword from "../../interface/services/IhashPassword";
import Ijwt from "../../interface/services/Ijwt";
import { IResponse ,StoreData } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";

export const loginAdmin = async(
adminRepository:IAdminRepository,
bcrypt:IHashPassword,
jwt:Ijwt,
email:string,
password:string
): Promise<IResponse> => {
 try {
    const admin : IAdmin | null = await adminRepository.findAdmin(email)
    console.log('admin from usecase',admin)
    if(admin && admin._id){
      const match : boolean = await bcrypt.compare(password,admin.password)
      if(match){
       const {accessToken,refreshToken} =await jwt.createJWT(
        admin._id,
        admin.email,
        "admin",
        admin.name
       )
       console.log('admin token',accessToken,refreshToken)

       const responseData : StoreData ={
        _id:admin._id,
        name:admin.name,
        email:admin.email,
        adminAccessToken:accessToken,
        adminRefreshToken:refreshToken,
       }
       return {
        status:200,
        success:true,
        data:responseData,
        message:`login successfully welcome ${admin.name}`
       }
      }
      throw ErrorResponse.badRequest("enter proper password")
    }
    throw ErrorResponse.badRequest("wrong password or email")
 } catch (error) {
    throw error
 }
}