import { IforgotPassword,StoreData } from "../../../../usecase/interface/services/Iresponse";
import UserModel from "../../model/userModel";

export const forgotPassword = async (
    newPassword : IforgotPassword,
    userModels: typeof UserModel
): Promise<StoreData | never> => {
    try {
        const user = await userModels.findOne({ email: newPassword.email });
           if(user){
            user.password = newPassword.password;
            await user.save();
            const responseData: StoreData = {
                _id: user._id,
                name: user.first_name,
                email : user.email as string
              };
            return responseData;
           }
           throw new Error("Internal Server Error")
    } catch (error) {
        throw error;
    }
}