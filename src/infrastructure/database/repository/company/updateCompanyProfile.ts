import { ICompany } from "../../../../domain/company";
import CompanyModel from "../../model/companyModel";

export const updateCompanyProfile = async (
    company_name: string,
    company_email: string, 
    company_address: string, 
    state: string, 
    postal_code: string,
    country: string,
    company_website: string,
    locality: string, 
    company_description: string, 
    company_contactperson: string, 
    company_contactphone: string, 
    industry_type: string,
    companyModels:typeof CompanyModel
):Promise<ICompany|null> =>{
    try {
        const company = await companyModels.findOne({company_email:company_email})
    if(company){
        company.company_name=company_name
        company.company_email=company_email
        company.company_address=company_address
        company.state=state
        company.postal_code=postal_code
        company.country=country
        company.company_website=company_website
        company.locality=locality
        company.company_description=company_description
        company.contact_personname=company_contactperson
        company.contact_personphone=company_contactphone
        company.industry_type=industry_type
        await company.save()
        return company
    } 
    return null
    } catch (error) {
        throw error
    }
    
    
}