import { IAdminRepository } from "../interface/repository/IadminRepository";
import { IUserRepository } from "../interface/repository/IuserRepository";
import IHashPassword from "../interface/services/IhashPassword";
import Ijwt from "../interface/services/Ijwt";
import { loginAdmin } from './admin/loginAdmin';
import { getUsers } from "./admin/getUsers";
import { blockUnblock } from "./admin/blockUser";
import { S3Client } from "@aws-sdk/client-s3";
import { Is3bucket } from '../interface/services/Is3Services';
import { usersCount } from "./admin/usersCount";
import { IEventRepository } from "../interface/repository/IeventRepository";
import { eventCount } from "./admin/eventCount";
import { liveEventCount } from "./admin/liveEventCount";
import { piechartData } from "./admin/piechartData";
import { filterUser } from "./admin/filterUser";
import { adminRefreshToken } from "./admin/adminRefreshToken";
import { IReportRepository } from "../interface/repository/IReportRepository";
import { completeReport } from "./report/completeReport";

export class AdminUseCase {
    
    private readonly adminRepository : IAdminRepository;
    private readonly userRepository : IUserRepository;
    private readonly eventRepository : IEventRepository
    private readonly bcrypt : IHashPassword;
    private readonly jwt : Ijwt;
    private readonly s3Service:Is3bucket;
    private readonly s3:S3Client;
    private readonly reportRepository: IReportRepository;
    constructor(
        
        adminRepository: IAdminRepository,
        userRepository: IUserRepository,
        eventRepository: IEventRepository,
        bcrypt: IHashPassword,
        jwt: Ijwt,
        s3service:Is3bucket,
        s3:S3Client,
        reportRepository: IReportRepository,
    ){
        
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository
        this.bcrypt = bcrypt 
        this.jwt =jwt
        this.s3Service=s3service
        this.s3=s3
        this.reportRepository = reportRepository;
    }

    async loginAdmin({email,password}:{email:string,password:string}){
        return loginAdmin(
            this.adminRepository,
            this.bcrypt,
            this.jwt,
            email,
            password
        )
    }
    async findAllUsers(){
        return getUsers(
            this.s3Service,
            this.s3
        );
    }
    async blockUnblock(_id:string){
        return blockUnblock(
            this.userRepository,
            _id
        )
    }
    async usersCount(){
        return usersCount(
            this.userRepository
        )
    }
    async eventCount(){
        return eventCount(
            this.eventRepository
        )
    }
    async liveEventCount(){
        return liveEventCount(
            this.eventRepository
        )
    }
    async piechartData(){
        return piechartData(
            this.eventRepository
        )
    }
    async filterUser(){
        return filterUser(
            this.userRepository
        )
    }
    async completeReport(){
        return completeReport(
            this.reportRepository
        )
    }
    async adminRefreshToken(incomingRefreshToken:string){
        return adminRefreshToken(
            this.adminRepository,
            this.jwt,
            incomingRefreshToken,
        )
    }
    
}