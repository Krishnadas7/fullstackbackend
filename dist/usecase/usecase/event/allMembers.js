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
exports.allMembers = void 0;
const errorResponse_1 = __importDefault(require("../../handler/errorResponse"));
const statusCodes_1 = require("../../../utils/statusCodes");
const allMembers = (eventRepository, s3service, s3, eventId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield eventRepository.allMembers(eventId);
        // Flatten the userDetails array for easier handling
        const userDetails = members.flatMap((member) => member.userDetails);
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
                status: statusCodes_1.StatusCodes.OK,
                success: true,
                message: 'members',
                data: members,
            };
        }
        throw errorResponse_1.default.badRequest('Something went wrong in members');
    }
    catch (error) {
        throw error;
    }
});
exports.allMembers = allMembers;
