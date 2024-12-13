import { S3Client } from "@aws-sdk/client-s3";
import { IEventRepository } from "../../interface/repository/IeventRepository";
import { Is3bucket } from "../../interface/services/Is3Services";
import ErrorResponse from "../../handler/errorResponse";
import { IUser } from "../../../domain/user";
import { StatusCodes } from "../../../utils/statusCodes"


export const allMembers = async (
  eventRepository: IEventRepository,
  s3service: Is3bucket,
  s3: S3Client,
  eventId: string
) => {
  try {
    const members:any = await eventRepository.allMembers(eventId);
    
    // Flatten the userDetails array for easier handling
    const userDetails = members.flatMap((member:any) => member.userDetails);

    // Map through userDetails and fetch images
    // const urlPromises = userDetails?.map(async (user2: IUser) => {
    //   if (user2.profileImage) {
    //     const url = await s3service.getImages(s3, user2.profileImage as string);
    //     user2.profileImage = url;
    //   }
    // });

    // await Promise.all(urlPromises);

    if (members) {
      return {
        status: StatusCodes.OK,
        success: true,
        message: 'members',
        data: members,
      };
    }

    throw ErrorResponse.badRequest('Something went wrong in members');
  } catch (error) {
    throw error;
  }
};
