import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import INodemailer from "../../interface/services/Inodemailer";
import { IResponse } from "../../interface/services/Iresponse";
import { StatusCodes } from "../../../utils/statusCodes"


export const sendEmailFogotPassword = async (
    userRepository: IUserRepository,
    nodemailer: INodemailer,
    email: string,
    name: string
  ): Promise<IResponse> => {
    try {
     
      const user = await userRepository.findUser(email);
      if (user) {
        if (user.is_block) {
          throw ErrorResponse.badRequest("Your account is blocked");
        }
        const verify = await nodemailer.sendEmailforForgotPassword(email, name);
        return {
          status: StatusCodes.OK,
          success: true,
          message: verify,
        };
      }
      throw ErrorResponse.badRequest("User not exist");
    } catch (err) {
      throw err;
    }
  };