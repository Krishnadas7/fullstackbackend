import UserModel from "../../model/userModel"


export const usersCount = async (
    userModel:typeof UserModel
) =>{
    try {
        const res =   userModel.find().countDocuments()  
        return res
    } catch (error) {
        throw error
    }
}