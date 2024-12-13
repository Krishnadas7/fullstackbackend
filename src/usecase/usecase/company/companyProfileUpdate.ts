import  jwt  from 'jsonwebtoken';
import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import { ICResponse } from "../../interface/services/Iresponse";
import { Is3bucket } from "../../interface/services/Is3Services";
import { S3Client } from "@aws-sdk/client-s3";
import ErrorResponse from '../../handler/errorResponse';
import { StatusCodes } from "../../../utils/statusCodes"
import ICloudinary from '../../interface/services/Icloudinary';
import CompanyModel from '../../../infrastructure/database/model/companyModel';

interface DecodedToken {
    id: string;
    // other properties if needed
  }
export const companyProfileUpdate = async (
        companyRepository:ICompanyRepository,
        s3service:Is3bucket,
        s3:S3Client,
        cloudinary:ICloudinary,
        company_name: string,
        company_email: string,
        company_address: string,
        state: string,
        postal_code: string,
        country: string,
        company_website: string,
        locality: string,
        company_description: string,
        contact_personname: string,
        contact_personphone: string,
        industry_type: string,
        companyLogo:Express.Multer.File,
        token:string,
):Promise<ICResponse>=>{
    try {
    const decoded = await jwt.verify(token,process.env.ACCESS_TOKEN_KEY as string) as DecodedToken;
    // const imageUpload = await s3service.profileImageUpdate(s3,companyLogo,decoded.id)
    // if(imageUpload){
        // const response = await companyRepository.updateCompanyImageName(imageUpload,decoded.id)
        const company = await CompanyModel.findOne({company_email:company_email})
        if(company){
        const imageU = await cloudinary.imageUpload(companyLogo as any,company._id as string)
        const urlSetUp = await cloudinary.getImage(company._id as string)
           company.company_logo = urlSetUp
            await company.save()
        const updateProfile = await companyRepository.updateProfile(
            company_name,
            company_email,
            company_address,
            state,
            postal_code,
            country,
            company_website,
            locality,
            company_description,
            contact_personname,
            contact_personphone,
            industry_type
        )
        return {
            status:StatusCodes.OK,
            success:true,
            message:'your profile was updated',
            data:updateProfile
        }
    }
    throw ErrorResponse.badRequest('wrong in edit profile')
    } catch (error) {
        throw error
    }    
}