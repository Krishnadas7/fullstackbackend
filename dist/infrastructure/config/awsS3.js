"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// import ff from '../../../.env'
const envFilePath = path_1.default.resolve(__dirname, '../../../.env');
dotenv_1.default.config({ path: envFilePath });
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const s3AccessKey = process.env.S3_ACCESS_KEY;
const secretKey = process.env.SECRET_ACCESS_KEY;
if (!bucketName || !bucketRegion || !s3AccessKey || !secretKey) {
    throw new Error('Missing required environment variables.');
}
const clientConfig = {
    credentials: {
        accessKeyId: s3AccessKey,
        secretAccessKey: secretKey,
    },
    region: bucketRegion,
};
exports.s3 = new client_s3_1.S3Client(clientConfig);
