import ErrorResponse from "../../handler/errorResponse";
import { IEventRepository } from "../../interface/repository/IeventRepository";

export const piechartData = async (
    eventrepository:IEventRepository
) =>{
  try {
    const pData = await eventrepository.piechartData()
    if(pData){
        return {
            status:200,
            success:true,
            message:'piechart data',
            data:pData
        }
    }
    throw ErrorResponse.badRequest('wrong in peichart data fetching')
  } catch (error) {
     throw error
  }
}