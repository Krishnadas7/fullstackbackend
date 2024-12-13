import CompanyModel from "../../model/companyModel";
export const getAllCompany =async (
    companyModels:typeof CompanyModel 
) =>{
    try {
       const companies = await companyModels.find()
       return companies
    } catch (error) {
        throw error
    }
}