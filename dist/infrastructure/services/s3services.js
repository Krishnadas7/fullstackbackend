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
exports.S3services = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const envFilePath = path_1.default.resolve(__dirname, '../../../../.env');
dotenv_1.default.config({ path: envFilePath });
aws_sdk_1.default.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.BUCKET_REGION
});
const ses = new aws_sdk_1.default.SES();
class S3services {
    sendGroupEmail(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const emails = event;
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
                const data = yield ses.sendEmail(params).promise();
                return 'Emails sent successfully';
            }
            catch (err) {
                console.error('Error sending emails:', err);
                throw err;
            }
        });
    }
    profileImageUpdate(s3Obj, file, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const bucketName = process.env.BUCKET_NAME;
            console.log('bucket namee ', bucketName, name);
            console.log('keytyy', file);
            if (!file || !file.buffer || !file.mimetype) {
                throw new Error("Invalid file properties. Ensure file, buffer, and mimetype are properly set.");
            }
            const params = {
                Bucket: bucketName,
                Key: name,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            const command = new client_s3_1.PutObjectCommand(params);
            try {
                yield s3Obj.send(command);
                console.log("upload success...");
                return name;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getImages(s3Obj, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const bucketName = process.env.BUCKET_NAME;
            const params = {
                Bucket: bucketName,
                Key: key,
            };
            const command = new client_s3_1.GetObjectCommand(params);
            try {
                const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3Obj, command, { expiresIn: 3600 });
                return url;
            }
            catch (error) {
                console.error("Error getting pre-signed URL:", error);
                throw error;
            }
        });
    }
}
exports.S3services = S3services;
