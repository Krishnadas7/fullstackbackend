import UserModel from "../../model/userModel";

export const blockUser = async(
    _id:string,
    userModels: typeof UserModel
): Promise<string | null> =>{
    try {
        const user = await userModels.findOne({ _id: _id }).select("-password");
        if(user){
          user.is_block = !user.is_block
          await user.save()
          return 'successfully updated'
        }else{
            return null
        }
    } catch (error) {
       throw error   
    }
}