"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileImageUpdate = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const profileImageUpdate = (userRepository, s3service, s3, cloudinary, image, id, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!image) {
            throw errorResponse_1.default.internalError('No image provided');
        }
        // Update the profile image in S3
        // const nameReturn = await s3service.profileImageUpdate(s3, image, id);
        // if (!nameReturn) {
        //   throw ErrorResponse.internalError('Failed to update image in S3');
        // }
        // Find the user
        const user = yield userRepository.findUser(email);
        if (!user || !user._id) {
            throw errorResponse_1.default.badRequest('User does not exist');
        }
        const imageUpload = yield cloudinary.imageUpload(image, user === null || user === void 0 ? void 0 : user._id);
        console.log('image upload  ', imageUpload);
        if (imageUpload) {
            // const urlSetUp = await cloudinary.getImage(user._id as string)
            console.log('url setup ');
            user.profileImage = imageUpload;
            yield user.save();
        }
        // Build the user profile URL
        // const userId = user._id.toString();
        // let url: string = '';
        // if (user.profileImage) {
        //   url = await s3service.getImages(s3, userId);
        // }
        // Prepare response data
        const responseData = {
            _id: user._id,
            name: user.first_name,
            email: user.email,
            profileImg: user.profileImage
        };
        // Update the user's profile image in the database
        // const response = await userRepository.uploadProfileImage(nameReturn, id);
        // if (!response) {
        //   throw ErrorResponse.internalError('Failed to update user profile image');
        // }
        return {
            status: statusCodes_1.StatusCodes.OK,
            success: true,
            message: 'Profile updated successfully',
            data: responseData
        };
    }
    catch (error) {
        // Ensure the error is properly thrown and handled
        if (error instanceof errorResponse_1.default) {
            throw error;
        }
        else {
            throw errorResponse_1.default.internalError('An unexpected error occurred');
        }
    }
});
exports.profileImageUpdate = profileImageUpdate;
