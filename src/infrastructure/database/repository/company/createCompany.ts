import { ICompany } from "../../../../domain/company";
import CompanyModel from "../../model/companyModel";
import { CompanyData } from "../../../../usecase/interface/services/Iresponse";

export const createCompany = async (
    company: ICompany,
    companyModel:typeof CompanyModel
) : Promise<CompanyData> =>{
    try {
        const companyD = await companyModel.create(company)
        console.log('created companyyyy',companyD,companyD._id)
        await companyD.save()
        const responseData : CompanyData = {
             _id:companyD._id,
             company_email:companyD.company_email,
             company_name:companyD.company_name
        }
        return responseData 
    } catch (error) { 
        throw error
    }
}