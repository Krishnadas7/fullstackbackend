import { ICompany } from "../../../domain/company";
import { CompanyData } from "../../../usecase/interface/services/Iresponse";
import { ICompanyRepository } from "../../../usecase/interface/repository/IcompanyRepository";
import CompanyModel from "../model/companyModel";
import { createCompany } from "./company/createCompany";
import { findCompany } from "./company/findCompany";
import { findCompanyWithId } from "./company/findCompanyWithId";
import { updateCompanyImageName } from "./company/updateCompanyImageName";
import { updateCompanyProfile } from "./company/updateCompanyProfile";
import { getAllCompany } from "./company/getAllCompany";
import { blockCompany } from "./company/blockCompany";

export class CompanyRepository implements ICompanyRepository{
    constructor(private readonly companysModel:typeof CompanyModel){}

   async createCompany(company: ICompany): Promise<CompanyData> {
      return createCompany(company,this.companysModel)
  }
    async findCompany(company_email: string): Promise<ICompany | null> {
      return findCompany(company_email,this.companysModel)
  }
    async findCompanyWithId(id: string): Promise<ICompany | null> {
      return findCompanyWithId(id,this.companysModel)
  }
   async updateCompanyImageName(image: string, id: string): Promise<Boolean> {
      return updateCompanyImageName(image,id,this.companysModel)
  }
   async updateProfile(
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
     industry_type: string
      ) {
      return updateCompanyProfile(
        company_name,
        company_email,
        company_address,
        state,
        postal_code,
        country,
        company_website,
        locality,
        company_description,
        company_contactperson,
        company_contactphone,
        industry_type,
        this.companysModel
      )
  }
  getAllCompany(): Promise<ICompany[]> {
      return getAllCompany(this.companysModel)
  }
  async blockCompany(companyId: string): Promise<boolean> {
      return blockCompany(companyId,this.companysModel)
  }

}