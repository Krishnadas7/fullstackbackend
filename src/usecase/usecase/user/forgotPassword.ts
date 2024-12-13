import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import IHashPassword from "../../interface/services/IhashPassword";
import Ijwt from "../../interface/services/Ijwt";
import { IResponse } from "../../interface/services/Iresponse";
import { StatusCodes } from "../../../utils/statusCodes"

export const forgotPassword = async (
    userRepository: IUserRepository,
    bcrypt: IHashPassword,
    jwt : Ijwt,
    email: string,
    password: string
  ): Promise<IResponse> => {
    try {
        const hashedPassword = await bcrypt.createHash(password);
        const newPassword = {
          email,
          password: hashedPassword,
        };
        const forgotUser = await userRepository.forgotPassword(newPassword);

          const token = jwt.createJWT(forgotUser._id as string, forgotUser.email as string, "user", forgotUser.name as string);
          return {
            status: StatusCodes.OK,
            success: true,
            message: `Successfully Forgot Password Welcome ${forgotUser.name}`,
            data : forgotUser
          };
       
    } catch (err) {
      throw err;
    }
  };