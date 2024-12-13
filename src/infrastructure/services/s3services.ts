import { PutObjectCommand,S3Client,GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Is3bucket } from "../../usecase/interface/services/Is3Services";
import path from 'path'
import dotenv from 'dotenv'
import AWS from 'aws-sdk';

const envFilePath = path.resolve(__dirname, '../../../../.env');
dotenv.config({ path: envFilePath })

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.BUCKET_REGION
  });
  
  const ses = new AWS.SES();
export class S3services implements Is3bucket{
    async sendGroupEmail(event:string[]) {
        const emails = event
    
        const params = {
          Source: 'skrishnadas61@gmail.com', // The email address you verified with SES
          Destination: {
            ToAddresses: emails
          },
          Message: {
            Subject: {
              Data: 'Event Starting Soon'
            },
            Body: {
              Text: {
                Data: 'Your event is starting soon. Please join us!'
              },
              Html: {
                Data: '<strong>Your event is starting soon. Please join us!</strong>'
              }
            }
          }
        };
    
        try {
          const data = await ses.sendEmail(params).promise();
          return 'Emails sent successfully'
        } catch (err) {
          console.error('Error sending emails:', err);
          throw err;
        }
      }

   async profileImageUpdate(s3Obj: S3Client, file: Express.Multer.File,name:string){
    const bucketName = process.env.BUCKET_NAME;
    
    console.log('bucket namee ',bucketName,name)
   console.log('keytyy',file);
   if (!file || !file.buffer || !file.mimetype) {
    throw new Error("Invalid file properties. Ensure file, buffer, and mimetype are properly set.");
}
   const params = {
    Bucket: bucketName,
    Key:name,
    Body: file.buffer,
    ContentType: file.mimetype,
};


    const command = new PutObjectCommand(params);
    
    try {

        await s3Obj.send(command);
        console.log("upload success...");
        
        return name; 

    } catch (error) {
        throw error
    }    
   }
   async getImages(s3Obj: S3Client, key: string): Promise<string> {
    const bucketName = process.env.BUCKET_NAME;
    
    const params = {
        Bucket: bucketName,
        Key: key,
    };
    
    const command = new GetObjectCommand(params);
    try {

        const url = await getSignedUrl(s3Obj as any, command as any, { expiresIn: 3600 });
        return url;

    } catch (error) {
        console.error("Error getting pre-signed URL:", error);
        throw error
    }
}
   
}



