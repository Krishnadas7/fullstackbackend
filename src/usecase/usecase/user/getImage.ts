import { Is3bucket } from "../../interface/services/Is3Services"
import { S3Client } from "@aws-sdk/client-s3"
import { IUserRepository } from "../../interface/repository/IuserRepository"
import ErrorResponse from "../../handler/errorResponse";
import { StatusCodes } from "../../../utils/statusCodes"

export const getImage = async(
    userRepository:IUserRepository,
    s3service:Is3bucket,
    s3:S3Client,
    email:string
)=>{
  try {
     const user = await userRepository.findUser(email)
     if(user && user._id){
      const userId = user._id.toString()
      console.log('useridddddd',userId)
      const url = await s3service.getImages(s3,userId as string)
      return {
         status:StatusCodes.OK,
         success:true,
         message:'message is got',
         data:url
      }
     }
    throw ErrorResponse.badRequest('wrong in image showing')
  } catch (error) {
    throw error
  }
}