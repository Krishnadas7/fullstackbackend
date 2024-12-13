import { ICompany } from "../../../domain/company";
import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import { Is3bucket } from '../../interface/services/Is3Services';
import { S3Client } from "@aws-sdk/client-s3";
import { StatusCodes } from "../../../utils/statusCodes"

export const getAllCompany = async (
    companyRepository:ICompanyRepository,
    s3service:Is3bucket,
    s3:S3Client
) =>{
    try {
        const companies = await companyRepository.getAllCompany()
        // const urlPromises = companies.map(async (company :ICompany) => {
        //     console.log('user profile image', company.company_logo);
        //     try {
        //         if(company && company._id){
        //             const companyId = company?._id.toString()
        //             const url = await s3service.getImages(s3, companyId as string);
        //             company.company_logo = url;
        //         }
                
        //     } catch (err) {
        //         console.error(`Failed to get pre-signed URL for image ${company.profileImage}:`, err);
        //         company.company_logo = ''; // Or handle it appropriately based on your requirements
        //     }
        // });
        // await Promise.all(urlPromises);
        return {
            status:StatusCodes.OK,
            success:true,
            message:'all company details',
            data:companies
        }
    } catch (error) {
        throw error
    }
}