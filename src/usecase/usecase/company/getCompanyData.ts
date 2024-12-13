import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import { ICResponse } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";
import jwt from 'jsonwebtoken'
import { StatusCodes } from "../../../utils/statusCodes"

// Define your decoded token type
interface DecodedToken {
    id: string;
    // other properties if needed
  }

export const getcompanyData = async (
    companyRepository:ICompanyRepository,
    token:string
) =>{
    try {
        const decoded = await jwt.verify(token,process.env.ACCESS_TOKEN_KEY as string) as DecodedToken;

        const companyData = await companyRepository.findCompanyWithId(decoded.id as string)
              return {
                status:StatusCodes.OK,
                success:true,
                message:'company prfile data',
                data:companyData
              }
    } catch (error) {
        throw(error)
    }
    

   
}