import CompanyModel from "../../model/companyModel";
export const findCompany =async (
    company_email:string,
    companyModels:typeof CompanyModel 
) =>{
    try {
        const company = await companyModels.findOne({company_email:company_email})
        return company
    } catch (error) {
        throw error
    }
}