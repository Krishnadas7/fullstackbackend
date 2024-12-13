import UserModel from "../../model/userModel";

export const getRandomUser = async(
    userId:string,
    userModels: typeof UserModel
)=>{
    try {
        console.log('in user repository',typeof userId);
        const userExist = await userModels.findOne({_id:userId});
        return userExist
    } catch (error) {
        throw error
    }
}