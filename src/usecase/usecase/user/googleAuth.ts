import { IUser } from "../../../domain/user";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import Ijwt from "../../interface/services/Ijwt";
import IHashPassword from "../../interface/services/IhashPassword";
import { IResponse,StoreData } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { Is3bucket } from "../../interface/services/Is3Services";
import { S3Client } from "@aws-sdk/client-s3";
import { StatusCodes } from "../../../utils/statusCodes"


export const googleAuth = async (
        requestValidator:IRequestValidator,
        userRepository:IUserRepository,
        bcrypt:IHashPassword,
        jwt:Ijwt,
        s3service:Is3bucket,
        s3:S3Client,
        first_name:string,
        email:string,
        password:string
):Promise<IResponse> =>{
    try {
         const user: IUser | null = await userRepository.findUser(email)
         let url:string=''
           
         if(!user){
            const hashedPassword = await bcrypt.createHash(password)
            
            const newUser ={
                first_name,
                email,
                password:hashedPassword,
                profileImg:url,
               }
            const creatingNewUser  = await userRepository.createUser(newUser)
            
           const { accessToken, refreshToken } =await jwt.createJWT(creatingNewUser._id as string, creatingNewUser.email as string, "user",creatingNewUser.first_name as string);
           const responseData: StoreData = {
            _id: creatingNewUser._id,
            name: creatingNewUser.first_name,
            email: creatingNewUser.email as string,
            profileImg:url,
            userAccessToken: accessToken,
            userRefreshToken: refreshToken,
        }
           return {
            status: StatusCodes.OK,
            success: true,
            data: responseData,
            message: `Login successful, welcome ${creatingNewUser.first_name}`
        }
         }
         if (user && user._id) {
             if (user.is_block) {
                 throw ErrorResponse.badRequest('your account is blocked')
             }
             if(user?.profileImage && user?.profileImage!==''){
                const userId = user?._id?.toString()
                 url =await s3service.getImages(s3,userId as string)
            }
             const { accessToken, refreshToken } =await jwt.createJWT(user._id, user.email as string, "user", user.first_name as string);
             user.refreshToken=refreshToken
             const responseData: StoreData = {
                 _id: user._id,
                 name: user.first_name,
                 email: user.email as string,
                 profileImg:url,
                 userAccessToken: accessToken,
                 userRefreshToken: refreshToken,
             }
 
             return {
                 status: 200,
                 success: true,
                 data: responseData,
                 message: `Login successful, welcome ${user.first_name}`
             }
         }
         throw ErrorResponse.badRequest('wrong password or email');
     } catch (error) {
         throw error;
     }
}