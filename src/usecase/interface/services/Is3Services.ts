import { S3Client } from "@aws-sdk/client-s3";

export interface Is3bucket{
    profileImageUpdate(s3Obj:S3Client,file:Express.Multer.File,name:string):Promise<string>;
    getImages(s3Obj:S3Client,key:string):Promise<string>;
    sendGroupEmail(event:string[]):Promise<unknown>;
}