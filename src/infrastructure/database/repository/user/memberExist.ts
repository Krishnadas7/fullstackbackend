import UserModel from "../../model/userModel";

export const memberExist = async (
    userId: string,
    email: string,
    userModel: typeof UserModel
): Promise<boolean> => {
    try {
        console.log('===', userId, email);
        
        const regex = new RegExp(`^${email}`, 'i');
        const exist = await userModel.findOne({
            _id: userId,
            team: { $elemMatch: { $regex: regex } }
        });

        if(exist){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.error('Error in memberExist:', error);
        throw error;
    }
};
