import { IUser } from "../../../domain/user";
import UserModel from "../../../infrastructure/database/model/userModel";
import { IUserResponse } from "../../interface/services/Iresponse";
import { Is3bucket } from '../../interface/services/Is3Services';
import { S3Client } from "@aws-sdk/client-s3";

export const getUsers = async (
    s3service: Is3bucket,
    s3: S3Client
): Promise<IUserResponse> => {
    try {
        const users = await UserModel.find();
        const urlPromises = users?.map(async (user: IUser) => {
            console.log('user profile image', user.profileImage);
            try {
                const url = await s3service.getImages(s3, user.profileImage as string);
                user.profileImage = url;
            } catch (err) {
                console.error(`Failed to get pre-signed URL for image ${user.profileImage}:`, err);
                user.profileImage = ''; // Or handle it appropriately based on your requirements
            }
        });
        await Promise.all(urlPromises);

        console.log('user from get users', users);
        return {
            status: 200,
            success: true,
            data: users,
            message: 'Users fetched'
        };
    } catch (error) {
        throw error
    }
};
