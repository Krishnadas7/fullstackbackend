import CompanyModel from '../../model/companyModel'

export const updateCompanyImageName = async (
    imageName:string,
    id:string,
    companyModel:typeof CompanyModel
) :Promise<Boolean> =>{
   
  const result = await companyModel.updateOne({_id:id},{$set:{company_logo:imageName}})
   if(result.modifiedCount==1){
    return true
   }else{
    return false
   }
}