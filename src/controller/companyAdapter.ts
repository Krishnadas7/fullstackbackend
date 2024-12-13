import { Next,Res,Req } from "../infrastructure/types/expressTypes";
import ErrorResponse from "../usecase/handler/errorResponse";
import { CompanyUseCase } from "../usecase/usecase/companyuseCase";

export class CompanyAdapter{
    private readonly companyusecase : CompanyUseCase;
    constructor(companyusecase:CompanyUseCase){
        this.companyusecase=companyusecase
    }

    async createCompany(req: Req,res: Res,next : Next){
        try {
            const newCompany = await this.companyusecase.createCompany(req.body)
           
            if(newCompany){
               res.status(newCompany.status).json({
                success:newCompany.success,
                message:newCompany.message,
                company:newCompany.data
               })
            }
            
        } catch (error) {
            next(error)
        }
    }
    async companyLogin(req: Req,res: Res,next: Next){
        try {
            const company = await this.companyusecase.companyLogin(req.body)
            if(company){
                res.cookie("companyAccessToken", company.data.companyAccessToken, {
                    httpOnly:true,
                    secure:true,
                    sameSite: "strict",
                    maxAge:  900000
                });
                    res.cookie("companyRefreshToken", company.data.companyRefreshToken, {
                        httpOnly: true,
                        secure:true,
                        sameSite: "strict",
                        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
                    });
            }
            res.status(company.status).json({
                success: company.success,
                data: company.data,
                message: company.message,
            });
        } catch (error) {
            next(error)
        }
    }
    async sendEmailforCompany(req: Req,res: Res,next: Next){
        try {
            const sendEmail = await this.companyusecase.sendEmailforCompany(req.body)
            console.log('body for company====',req.body);
            
            if(sendEmail){
                res.status(sendEmail.status).json({
                    success:sendEmail.success,
                    message:sendEmail.message,
                })
            }

        } catch (error) {
            console.log('error from company sendemail',error)
            next(error)
        }
    }
    async getCompanyProfile(req: Req,res: Res,next: Next){
      try {
        const token = req.cookies.companyAccessToken
        console.log(token)
        const companyData = await this.companyusecase.getCompanyData(token)
        res.status(companyData.status).json({
            success:companyData.success,
            message:companyData.message,
            data:companyData.data
        })
      } catch (error) {
         next(error)
      }
    }
    async companyProfileUpdate (req: Req,res: Res,next: Next){
        try {
            const companyLogo = req.file
            if(companyLogo){
                const obj = {
                    company_name:req.body.company_name,
                    company_email:req.body.company_email,
                    company_address:req.body.company_address,
                    state:req.body.state,
                    postal_code:req.body.postal_code,
                    country:req.body.country,
                    company_website:req.body.company_website,
                    locality:req.body.locality,
                    company_description:req.body.company_description,
                    contact_personname:req.body.contact_personname,
                    contact_personphone:req.body.contact_personphone,
                    industry_type:req.body.industry_type,
                    companyLogo:companyLogo,
                    token:req.body.token
                   }
                const profileUpdate = await this.companyusecase.companyProfileUpdate(obj)
                res.status(profileUpdate.status).json({
                   success:profileUpdate.success,
                   message:profileUpdate.message,
                   data:profileUpdate.data
                })
            }
            
        } catch (error) {
            next(error)
        }
          

    }
    async getAllCompany(req:Req,res:Res,next:Next){
        try {
            const companies = await this.companyusecase.getAllCompany()
            if(companies){
                res.status(companies.status).json({
                    success:companies.success,
                    message:companies.message,
                    data:companies.data
                 })
            }
          
        } catch (error) {
            next(error)
        }
    }
    async blockCompany(req: Req,res : Res, next: Next){
        try{
            const companyId = req.body.companyId
      const blocked = await this.companyusecase.blockCompany(companyId)
      res.status(blocked.status).json({
        success:blocked.success,
        message:blocked.message
      })
        }catch(error){
            next(error)
        }
    }
    async companyRefreshToken(req: Req,res : Res, next: Next){
       try {
        const incomingRefreshToken =  req.body.refreshToken
        const tokens = await this.companyusecase.companyRefreshToken(incomingRefreshToken as string)
        const accessToken = tokens.data?.accessToken
        const refreshToken = tokens.data?.refreshToken
        res.status(tokens.status)
       .cookie("companyAccessToken",accessToken,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        maxAge: 900000 
       })
       .cookie("companyRefreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
       })
       .json({accessToken,refreshToken });
       } catch (error) {
        next(error)
        
       }
    }
}