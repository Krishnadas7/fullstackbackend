import ErrorResponse from "../../handler/errorResponse";
import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import { IResponse } from "../../interface/services/Iresponse";
import { StatusCodes } from "../../../utils/statusCodes"

export const blockCompany = async (
    companyRepository:ICompanyRepository,
    companyId:string,
    
):Promise<IResponse> =>{
    try {
        const blocked = await companyRepository.blockCompany(companyId)
        if(blocked){
            return {
                status:StatusCodes.OK,
                success:true,
                message:'company blocked successfully'
            }
        }
        throw ErrorResponse.badRequest('blocking error')
    } catch (error) {
        throw error
    }
}