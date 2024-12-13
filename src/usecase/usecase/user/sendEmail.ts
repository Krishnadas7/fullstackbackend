import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import INodemailer from "../../interface/services/Inodemailer";
import { IResponse } from "../../interface/services/Iresponse";
import { StatusCodes } from "../../../utils/statusCodes"


export const verifyEmail = async (
    userRepository: IUserRepository,
    nodemailer: INodemailer,
    first_name: string,
    email: string
  ): Promise<IResponse> => {
    try {
      const user = await userRepository.findUser(email);
      if(user){
        throw ErrorResponse.badRequest("User already exist");
      }
  
      const verify = await nodemailer.sendEmailVerification(email, first_name);
  
      return {
        status: StatusCodes.OK,
        success: true,
        message: verify,
      };
    } catch (err) {
      throw err;
    }
  };