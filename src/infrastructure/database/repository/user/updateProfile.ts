import UserModel from "../../model/userModel";

export const updateProfile = async (
    first_name:string,
    last_name:string,
    qualification:string,
    bio:string,
    socialmedialink1:string,
    socialmedialink2:string,
    id:string,
    userModels:typeof UserModel
) =>{
    const user = await userModels.findOne({_id:id})
    if(user){
        user.first_name = first_name || user.first_name
        user.last_name = last_name || user.last_name
        user.qualification = qualification || user.qualification
        user.bio = bio || user.bio
        user.socialmedialink1 = socialmedialink1 || user.socialmedialink1
        user.socialmedialink2 = socialmedialink2 || user.socialmedialink2
        await user.save()
        return user
    }
   return user
}