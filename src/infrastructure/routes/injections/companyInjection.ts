import { CompanyAdapter } from "../../../controller/companyAdapter";
import { CompanyUseCase } from "../../../usecase/usecase/companyuseCase";
import CompanyModel from "../../database/model/companyModel";
import { CompanyRepository } from "../../database/repository/companyRepository";
import Nodemailer from "../../services/nodemailer";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import  Redis from "../../services/redis";
import { S3services } from "../../services/s3services";
import {s3} from '../../config/awsS3'
import Cloudinary from '../../services/cloudinary'

const companyRepository = new CompanyRepository(CompanyModel)
const bcrypt = new Encrypt()
const nodemailer = new Nodemailer()
const jwt = new JwtPassword()
const redis = new Redis()
const s3service = new S3services()
const cloudinary = new Cloudinary()
const companyusecase = new CompanyUseCase(
    companyRepository,
    bcrypt,
    jwt,
    nodemailer,
    redis,
    s3service,
    s3,
    cloudinary
)
const companyAdapter = new CompanyAdapter(companyusecase)

export {companyAdapter}