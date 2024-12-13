import { IUser } from "../../../domain/user";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import Ijwt from "../../interface/services/Ijwt";
import IHashPassword from "../../interface/services/IhashPassword";
import { IResponse, StoreData } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { Is3bucket } from "../../interface/services/Is3Services";
import { S3Client } from "@aws-sdk/client-s3";
import { StatusCodes } from "../../../utils/statusCodes"


export const loginUser = async (
    requestValidator:IRequestValidator,
    userRepository: IUserRepository,
    bcrypt: IHashPassword,
    jwt: Ijwt,
    s3service:Is3bucket,
    s3:S3Client,
    email: string,
    password: string
): Promise<IResponse> => {
    try {
       const validation = requestValidator.validateRequiredFields({email,password},["email","password"])
 
       if(!validation.success){
        throw ErrorResponse.badRequest(validation.message as string)
       }
        
        const user: IUser | null = await userRepository.findUser(email)
        if (user && user._id) {
            if (user.is_block) {
                throw ErrorResponse.badRequest('You are corrently blocked');
            }
            const match:boolean = await bcrypt.compare(password,user.password)
            if(match){
            const { accessToken, refreshToken } =await jwt.createJWT(user._id, user.email as string, "user", user.first_name as string);
            // const userId = user._id.toString()
            // let url:string=''
            // if(user.profileImage!==''){
            //      url =await s3service.getImages(s3,userId)
                 
            // }
            // console.log('url from login user',url)
            user.refreshToken=refreshToken
            const responseData: StoreData = {
                _id: user._id,
                name: user.first_name,
                email: user.email as string,
                profileImg:user.profileImage,
                userAccessToken: accessToken,
                userRefreshToken: refreshToken,
            }

            return {
                status: StatusCodes.OK,
                success: true,
                data: responseData,
                message: `Login successful, welcome ${user.first_name}`
            }
        }
        throw ErrorResponse.badRequest('wrong password or email');
        }
        throw ErrorResponse.badRequest('wrong password or email');
    } catch (error) {
        throw error;
    }
}
