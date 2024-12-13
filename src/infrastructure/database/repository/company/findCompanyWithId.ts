import CompanyModel from "../../model/companyModel";
export const findCompanyWithId =async (
    id:string,
    companyModels:typeof CompanyModel 
) =>{
    try {
        const company = await companyModels.findOne({_id:id})
        return company
    } catch (error) {
        throw error
    }
}