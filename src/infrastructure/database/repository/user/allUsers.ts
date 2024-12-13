import UserModel from "../../model/userModel";

export const allUsers = async (
    userModel:typeof UserModel
)=>{
    try {
        const users = await userModel.find({is_block:false})
        return users
    } catch (error) {
        throw error
    }
}