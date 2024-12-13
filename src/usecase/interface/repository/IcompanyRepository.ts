import { updateCompanyImageName } from '../../../infrastructure/database/repository/company/updateCompanyImageName';
import { findCompany } from '../../../infrastructure/database/repository/company/findCompany';
import { ICompany } from "../../../domain/company";
import { CompanyData } from "../services/Iresponse";

export interface ICompanyRepository{
    createCompany(company:ICompany) : Promise<CompanyData> ;
    findCompany(company_email:string):Promise<ICompany | null>;
    findCompanyWithId(id:string):Promise<ICompany | null>
    updateCompanyImageName(image:string,id:string):Promise<Boolean>;
    updateProfile(
        company_name:string,
        company_email:string,
        company_address:string,
        state:string,
        postal_code:string,
        country:string,
        company_website:string,
        locality:string,
        company_description:string,
        company_contactperson:string,
        company_contactphone:string,
        industry_type:string
    ):Promise<unknown>;
    getAllCompany():Promise<ICompany[]>;
    blockCompany(companyId:string):Promise<boolean>;
}