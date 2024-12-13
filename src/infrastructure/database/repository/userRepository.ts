import { IUser } from "../../../domain/user";
import { StoreData } from "../../../usecase/interface/services/Iresponse";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser";
import { IUserRepository } from "../../../usecase/interface/repository/IuserRepository";
import { blockUser } from "./user/blockUser";
import { IforgotPassword } from "../../../usecase/interface/services/Iresponse";
import { forgotPassword } from "./user/forgotPassword";
import { uploadUserImage } from "./user/updateUserImage";
import { updatePassword } from "./user/updatePassword";
import {updateProfile} from './user/updateProfile'
import { getRandomUser } from "./user/getRandomUser";
import { memberExist } from "./user/memberExist";
import { addTeam } from "./user/addTeam";
import { usersCount } from "./user/usersCount";
import { filterUser } from "./user/filterUsers";
import { allUsers } from "./user/allUsers";

export class UserRepository implements IUserRepository{
    constructor(private readonly usersModel:typeof UserModel){}

     async createUser(newUser: IUser): Promise<StoreData> {
        return createUser(newUser, this.usersModel)
    }
     async findUser(email: string): Promise<IUser | null> {
        return findUser(email,this.usersModel)
    }
     async blockUser(_id: string): Promise<string | null> {
        return blockUser(_id,this.usersModel)    
    }
    async forgotPassword(newPassword: IforgotPassword): Promise<StoreData> {
        return forgotPassword(newPassword, this.usersModel);
      }
     async uploadProfileImage(image: string, id: string):Promise<Boolean> {
        return uploadUserImage(image,id,this.usersModel)
    }
     async updatePassword(newPassword: string,email:string): Promise<Boolean> {
        return updatePassword(newPassword,email,this.usersModel)
    }
    async updateProfile(
        first_name: string, 
        last_name: string,
        qualification: string,
        bio: string, 
        socialmedialink1: string,
        socialmedialink2: string, 
        id: string
        ): Promise<IUser | null> {
        return updateProfile(
            first_name,
            last_name,
            qualification,
            bio,
            socialmedialink1,
            socialmedialink2,
            id,
            this.usersModel)
    }
    async getRandomUser(userId: string): Promise<IUser | null> {
         return getRandomUser(userId,this.usersModel)
    }
    async memberExist(userId: string, email: string): Promise<boolean> {
        return memberExist(userId,email,this.usersModel)
    }
    async addTeam(team: string[],user_id:string):Promise<boolean> {
        return addTeam(team,user_id,this.usersModel)
    }
    async usersCount(): Promise<number> {
        return usersCount(this.usersModel)
    }
    async filterUsers() {
        return filterUser(this.usersModel)
    }
    async allUsers(): Promise<IUser[]> {
        return allUsers(this.usersModel)
    }
}