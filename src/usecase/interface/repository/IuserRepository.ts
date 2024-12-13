import { IUser } from "../../../domain/user";
import { StoreData } from "../services/Iresponse";
import { IforgotPassword } from "../services/Iresponse";

export interface IUserRepository{
    createUser(newUser: IUser) : Promise<StoreData> ;
    findUser(email:string) : Promise<IUser | null>;
    blockUser(_id: string): Promise<string | null>;
    forgotPassword(newPassword:IforgotPassword): Promise<StoreData>;
    uploadProfileImage(image:string,id:string):Promise<Boolean>;
    updatePassword(newPassword:string,email:string):Promise<Boolean>;
    updateProfile(first_name:string,last_name:string,qualification:string,bio:string,socialmedialink1:string,socialmedialink2:string,id:string):Promise<IUser | null>;
    getRandomUser(userId:string): Promise<IUser | null>;
    memberExist(userId:string,email:string):Promise<boolean>;
    addTeam(team:string[],user_id:string):Promise<boolean>;
    usersCount():Promise<number>;
    filterUsers():Promise<unknown>;
    allUsers():Promise<IUser[]>
}