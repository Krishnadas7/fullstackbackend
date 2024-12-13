export interface IUser {
    _id?:string;
    first_name?:string;
    last_name?:string;
    email?:string;
    mobile?:string;
    place?: string;
    age?: string;
    bio?:string;
    socialmedialink1?:string;
    socialmedialink2?:string;
    gender?: string;
    profileImage?:string;
    qualification?: string;
    team?:string[];
    is_block?: boolean;
    is_verified?: boolean;
    password:string;
    refreshToken?:string;
    createdAt?: Date;
    updatedAt?: Date;
}