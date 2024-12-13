import ErrorResponse from "../../handler/errorResponse";
import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import IHashPassword from "../../interface/services/IhashPassword";
import { IRedis } from '../../interface/services/Iredis';
import INodemailer from '../../interface/services/Inodemailer';
import { ICResponse } from '../../interface/services/Iresponse';
// import {redisClient}  from "../../../infrastructure/config/redis";
import { StatusCodes } from "../../../utils/statusCodes"

export const sendEmailforCompany = async (
    CompanyRepository:ICompanyRepository,
    bcrypt:IHashPassword,
    nodemailer:INodemailer,
    redis:IRedis,
    company_name:string,
    company_email:string,
):Promise<ICResponse> =>{
    try {
        // await connectToRedis()
        const companyData = await CompanyRepository.findCompany(company_email)
        if(companyData){
           throw ErrorResponse.badRequest('email already exists')
        }
        
        await nodemailer.sendEmailForCompanyRegistration(company_email,company_name)
      
        return {
            status:StatusCodes.OK,
            success:true,
            message:'check your email'
        }
    
    } catch (error) {
        throw error
    }
   

    

}