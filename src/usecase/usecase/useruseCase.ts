import { IUserRepository } from '../interface/repository/IuserRepository';
import Ijwt from '../interface/services/Ijwt';
import IHashPassword from '../interface/services/IhashPassword';
import { createUser } from './user/createUser';
import { loginUser } from './user/loginUser';
import { sendEmailFogotPassword } from './user/sendOtpForgotPassword';
import { emailVeification } from './user/emailVerification';
import { forgotPassword } from './user/forgotPassword';
import { verifyEmail } from './user/sendEmail';
import INodemailer from '../interface/services/Inodemailer';
import { IRequestValidator } from '../interface/repository/IvalidareRepository';
import { googleAuth } from './user/googleAuth';
import { Is3bucket } from '../interface/services/Is3Services';
import { S3Client } from '@aws-sdk/client-s3';
import { profileImageUpdate } from './user/profileImageUpdate';
import { resetPassword } from './user/resetPassword';
import { tokenValidation } from './user/tokenValidation';
import {updateProfile} from './user/profileUpdate'
import { userData } from './user/userData';
import { getRandomUser } from './user/getRandomUser';
import { getImage } from './user/getImage';
import { memberExist } from './user/memberExist';
import { getNotification } from './user/getNotification';
import { IUnreadRepository } from '../interface/repository/IunreadRepository';
import { userRefreshToken } from './user/userRefreshToken';
import { IReportRepository } from '../interface/repository/IReportRepository';
import { createReport } from './user/createReport';
import { allUsers } from './user/allUser';
import ICloudinary from "../interface/services/Icloudinary";
export class UserUseCase{
  private readonly reportRepository : IReportRepository
    private readonly userRepository : IUserRepository;
    private readonly unreadRepository: IUnreadRepository;
    private readonly bcrypt : IHashPassword;
    private readonly nodemailer: INodemailer;
    private readonly jwt : Ijwt;
    private readonly requestValidator:IRequestValidator;
    private readonly s3Service:Is3bucket;
    private readonly s3:S3Client;
    private readonly cloudinary:ICloudinary;

    constructor(
        reportRepository : IReportRepository,
        userRepository : IUserRepository,
        unreadRepository:IUnreadRepository,
        bcrypt : IHashPassword,
        nodemailer: INodemailer,
        jwt : Ijwt,
        requestValidator:IRequestValidator,
        s3service:Is3bucket,
        s3:S3Client,
        cloudinary:ICloudinary
    ){ 
        this.reportRepository = reportRepository
        this.userRepository = userRepository;
        this.unreadRepository = unreadRepository,
        this.bcrypt = bcrypt;
        this.nodemailer = nodemailer;
        this.jwt = jwt;
        this.requestValidator = requestValidator
        this.s3Service=s3service
        this.s3=s3
        this.cloudinary=cloudinary
    }


    async createUser({
        first_name,
        last_name,
        email,
        password,
        confirm_password,
        mobile
    }:{
        first_name:string,
        last_name:string,
        email:string,
        password:string,
        confirm_password:string,
        mobile:string
    }){
        return createUser(
            this.userRepository,
            this.bcrypt,
            first_name,
            last_name,
            email,
            password,
            confirm_password,
            mobile
        )
    }
    async loginUser({
        email,
        password,
        
    }:{
        email:string;
        password:string
    }){
        return loginUser(
            this.requestValidator,
            this.userRepository,
            this.bcrypt,
            this.jwt,
            this.s3Service,
            this.s3,
            email,
            password
        )
    }
    async googleAuth({first_name,email,password}:{first_name:string;email:string;password:string}){
        return googleAuth(
          this.requestValidator,
          this.userRepository,
          this.bcrypt,
          this.jwt,
          this.s3Service,
          this.s3,
          first_name,
          email,
          password
        )
    }

    async verifyEmail({ first_name, email }: { first_name: string; email: string }) {
        return verifyEmail(this.userRepository, this.nodemailer, first_name, email);
      }

    async emailVeification({ otp, email }: { otp: string; email: string }) {
        return emailVeification(this.nodemailer, otp, email);
    }
   
    async tokenValidation({forgotToken}:{forgotToken:string}){
      return tokenValidation(forgotToken)
    }
    async sendEmailFogotPassword({
     email, 
     name 
        }: { 
         email: string;
         name: string 
        }) {
        return sendEmailFogotPassword(
            this.userRepository,
            this.nodemailer, 
            email,
            name);
    }

    async forgotPassword({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) {
        return forgotPassword(
          this.userRepository,
          this.bcrypt,
          this.jwt,
          email,
          password
        );
      }
      async uploadProfileImage({
         image,
         id,
         email
      }:{
       
        image:Express.Multer.File| undefined;
        id:string;
        email:string;
      }) {
        return profileImageUpdate(
            this.userRepository,
            this.s3Service,
            this.s3,
            this.cloudinary,
            image,
            id,
            email
        )
      }
      async resetPassword({
        password,
        forgotToken
      }:{
        password:string;
        forgotToken:string;
      }){
        return resetPassword(
          this.userRepository,
          this.bcrypt,
          password,
          forgotToken
        )
      }
      async updateProfile({
        first_name,
        last_name,
        bio,
        qualification,
        socialmedialink1,
        socialmedialink2,
        token
      }:{
        first_name:string;
        last_name:string;
        bio:string;
        qualification:string;
        socialmedialink1:string;
        socialmedialink2:string;
        token:string;
      }){
        return updateProfile(
          this.userRepository,
          first_name,
          last_name,
          bio,
          qualification,
          socialmedialink1,
          socialmedialink2,
          token,
        )
      }
      async userData(email:string){
         return userData(
          this.userRepository,
          email
         )
      }
      async getRandomUser(userId:string){
        return getRandomUser(
         this.userRepository,
         userId
        )
     }
     async getImage(email:string){
      return getImage(
        this.userRepository,
        this.s3Service,
        this.s3,
        email
      )
     }
     async memberExist(userId:string,email:string){
      return memberExist(
        this.userRepository,
        userId,
        email
      )
     }
     async createReport({userEmail,report}:{userEmail:string,report:string}){
       return createReport(
        userEmail,
        report,
        this.reportRepository
       )
     }
     async getNotification(token:any){
      return getNotification(
        this.unreadRepository,
        token
      )
     }
     async userRefreshToken(incomingRefreshToken:string){
      return userRefreshToken(
        this.userRepository,
        this.jwt,
        incomingRefreshToken
      )
     }
     async allUsers(){
      return allUsers(
        this.userRepository
      )
     }
     

}