import UserModel from "../../model/userModel"


export const addTeam = async (
    team:string[],
    user_id:string,
    userModels:typeof UserModel
):Promise<boolean> =>{
    try {
        const user = await userModels.findOneAndUpdate({_id:user_id},{$set:{team:team}})
        if(user){
            return true
        }
        return false
    } catch (error) {
        throw error
    }
}