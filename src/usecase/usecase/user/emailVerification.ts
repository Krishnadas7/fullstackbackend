import ErrorResponse from "../../handler/errorResponse";
import INodemailer from "../../interface/services/Inodemailer";
import { IResponse } from "../../interface/services/Iresponse";
import { StatusCodes } from "../../../utils/statusCodes"

export const emailVeification = async (
    nodemailer: INodemailer,
    otp: string,
    email: string
  ): Promise<IResponse> => {
    try {
      console.log(email);
      console.log('otp',otp);
      
      const verify = await nodemailer.verifyEmail(otp, email);
    if (verify) {
      return {
        status: StatusCodes.OK,
        success: true,
        message: "Succesfully logged In",
      };
    }
    throw ErrorResponse.badRequest("Wrong OTP");
  } catch (err) {
    throw err;
  }
};