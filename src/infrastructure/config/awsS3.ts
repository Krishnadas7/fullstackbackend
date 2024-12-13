import { S3Client ,S3ClientConfig} from '@aws-sdk/client-s3';
import path from 'path'
import dotenv from 'dotenv'
// import ff from '../../../.env'
const envFilePath = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envFilePath })

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION 
const s3AccessKey = process.env.S3_ACCESS_KEY
const secretKey = process.env.SECRET_ACCESS_KEY

if (!bucketName || !bucketRegion || !s3AccessKey || !secretKey) {
  throw new Error('Missing required environment variables.');
}
const clientConfig:S3ClientConfig = {
  credentials: {
    accessKeyId: s3AccessKey,
    secretAccessKey: secretKey,
  },
  region: bucketRegion,
}

export const s3  = new S3Client (clientConfig);