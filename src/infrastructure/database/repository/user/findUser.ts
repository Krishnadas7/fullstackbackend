import UserModel from "../../model/userModel";

export const findUser = async(
    email:string,
    userModels: typeof UserModel
)=>{
    try {
        const userExist = await userModels.findOne({email:email});
        return userExist
        
    } catch (error) {
        throw error
    }
}