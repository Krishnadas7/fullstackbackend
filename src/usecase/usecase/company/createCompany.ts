import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import IHashPassword from "../../interface/services/IhashPassword";
import { ICResponse } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";
import { IRedis } from "../../interface/services/Iredis";
// import { redisClient } from "../../../infrastructure/config/redis";
import { ICompany } from "../../../domain/company";
import { StatusCodes } from "../../../utils/statusCodes"
import INodemailer from "../../interface/services/Inodemailer";
import { error } from "console";

export const createCompany = async (
    companyRepository:ICompanyRepository,
    bcrypt:IHashPassword,
    redis:IRedis,
    nodemailer:INodemailer,
    company_name:string,
    company_email:string,
    company_website:string,
    company_address:string,
    industry_type:string,
    company_description:string,
    password:string,
    otp:string
):Promise<ICResponse> =>{
   try {
    //  const dataFromRedis: string | null = await redisClient.get('companyData')
    //  const datas: ICompany = dataFromRedis ? JSON.parse(dataFromRedis) : {};
    //  if(otp !=datas.otp){
    //       throw ErrorResponse.badRequest('invalid otp')
    //  }
    try {
      console.log(otp,' ddsdsds',company_name);
      
      const res = await nodemailer.verifyEmail(otp,company_email)
      console.log('res from rverigy',res);
        if(!res){
          throw ErrorResponse.badRequest('invalid otp')
        }
        
        
    } catch (error) {
       throw ErrorResponse.badRequest('invalid otp')
    }
     const res = await nodemailer.verifyEmail(otp,company_email)
      
       const company={
        company_name:company_name,
        company_email:company_email,
        company_website:company_website,
        company_address:company_address,
        industry_type:industry_type,
        company_description:company_description,
        password:password
       }
       const newCompany = await companyRepository.createCompany(company)
       return {
        status:StatusCodes.OK,
        success:true,
        message:`company created successfully ${company_name}`,
        data:newCompany
       }
   } catch (error) {
     throw error
   }
}