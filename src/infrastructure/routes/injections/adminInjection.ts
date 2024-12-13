import { AdminAdapter } from "../../../controller/adminAdapter";
import { AdminUseCase } from "../../../usecase/usecase/adminuseCase";
import AdminModel from "../../database/model/adminModel";
import UserModel from "../../database/model/userModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import { S3services } from "../../services/s3services";
import {s3} from '../../config/awsS3'
import { EventRepository } from "../../database/repository/eventRepository";
import EventModel from "../../database/model/eventModel";
import { ReportRepository } from "../../database/repository/reportRepository";
import ReportModel from "../../database/model/reportModel";

const eventRepository = new EventRepository(EventModel)
const adminRepository = new AdminRepository(AdminModel)
const userRepository = new UserRepository(UserModel)
const reportRepository = new ReportRepository(ReportModel)
const bcrypt = new Encrypt()
const jwt = new JwtPassword()
const s3service = new S3services()
const adminusecase = new AdminUseCase(
    adminRepository,
    userRepository,
    eventRepository,
    bcrypt,
    jwt,
    s3service,
    s3,
    reportRepository
)
const adminAdapter = new AdminAdapter(adminusecase)

export {adminAdapter,adminusecase}
