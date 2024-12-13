import { UserAdapter } from "../../../controller/userAdapter";
import { UserUseCase } from "../../../usecase/usecase/useruseCase";
import UserModel from "../../database/model/userModel";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from '../../services/bcrypt'
import Nodemailer from "../../services/nodemailer";
import JwtPassword from "../../services/jwt";
import RequestValidator from "../../services/validateRepository";
import {s3} from '../../config/awsS3'
import { S3services } from "../../services/s3services";
import UnreadModel from "../../database/model/unreadModel";
import { UnreadRepository } from "../../database/repository/unreadRepository";
import { ReportRepository } from "../../database/repository/reportRepository";
import ReportModel from "../../database/model/reportModel";
import Cloudinary from '../../services/cloudinary'

const unreadRepository = new UnreadRepository(UnreadModel)
const userRepository = new UserRepository(UserModel)
const reportRepository = new ReportRepository(ReportModel)
const bcrypt = new Encrypt()
const jwt = new JwtPassword()
const nodemailer = new Nodemailer()
const requestValidator=new RequestValidator()
const s3service = new S3services()
const cloudinary = new Cloudinary()
const userusecase = new UserUseCase(
    reportRepository,
    userRepository,
    unreadRepository,
    bcrypt,
    nodemailer,
    jwt,
    requestValidator,
    s3service,
    s3,
    cloudinary

)
const userAdapter = new UserAdapter(userusecase)

export {userAdapter}