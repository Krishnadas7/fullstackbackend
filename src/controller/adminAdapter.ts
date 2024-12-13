import { Next,Res,Req } from "../infrastructure/types/expressTypes";
import { AdminUseCase } from "../usecase/usecase/adminuseCase";

export class AdminAdapter{
    private readonly adminusecase: AdminUseCase;
    constructor(
        adminusecase:AdminUseCase
    ){
        this.adminusecase = adminusecase
    }

    async loginAdmin(req:Req,res:Res,next:Next){
        try {
            const user = await this.adminusecase.loginAdmin(req.body);
             if(user){
             res.cookie('adminAccessToken',user.adminAccessToken,{
                httpOnly:true,
                secure:true,
                sameSite: "strict",
                maxAge:  900000
            })
            .cookie('adminRefreshToken',user.adminRefreshToken,{
                httpOnly: true,
                secure:true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
            })
            res.status(user.status).json({
                success: user.success,
                data: user.data,
                message:user.message,
                adminAccessToken:user.adminAccessToken,
                adminRefreshToken:user.adminRefreshToken
            })
        }
        } catch (error) {
            next(error)
        }
    }

    async getUsers(req:Req,res:Res,next:Next){
        try {
            const user = await this.adminusecase.findAllUsers();
             res.status(user.status).json({
                success:user.success,
                data:user.data,
                message:user.message
            })
        } catch (error) {
            
            next(error)
        }
    }
    async blockUnblock(req:Req,res:Res,next:Next){
        try {
            const _id = req.query._id as string;
            
            const user = await this.adminusecase.blockUnblock(_id)
            user && 
            res.status(user.status).json({
                success: user.success,
                data: user.data,
                message: user.message,
            })
        } catch (error) {
            next(error)
        }
    }
    async userCount(req:Req,res:Res,next:Next){
        try {
            const userC = await this.adminusecase.usersCount()
             userC &&
             res.status(userC.status).json({
                success: userC.success,
                data: userC.data,
                message: userC.message,
            })
        } catch (error) {
            next(error)
        }
    }
    async eventCount(req:Req,res:Res,next:Next){
        try {
            const eventC = await this.adminusecase.eventCount()
            
             eventC &&
             res.status(eventC.status).json({
                success: eventC.success,
                data: eventC.data,
                message: eventC.message,
            })
        } catch (error) {
            next(error)
        }
    }
    async liveEventCount(req:Req,res:Res,next:Next){
        try {
            const liveC = await this.adminusecase.liveEventCount()
            liveC &&
             res.status(liveC.status).json({
                success: liveC.success,
                data: liveC.data,
                message: liveC.message,
            })
        } catch (error) {
            next(error)
        }
    }
    async piechartData(req:Req,res:Res,next:Next){
        try {
            const pData = await this.adminusecase.piechartData()
            
            pData
            &&
            res.status(pData.status).json({
                success: pData.success,
                data: pData.data,
                message: pData.message,
            })
        } catch (error) {
            next(error)
        }
    }
    async filterUser(req:Req,res:Res,next:Next){
        try {
            const filterU = await this.adminusecase.filterUser()
            filterU
            &&
            res.status(filterU.status).json({
                success: filterU.success,
                data: filterU.data,
                message: filterU.message,
            })
        } catch (error) {
          next(error)  
        } 
    }
    async completeReport(req:Req,res:Res,next:Next){
        try{
         const data = await this.adminusecase.completeReport()
         data && 
         res.status(data.status).json({
            success: data.success,
            data: data.data,
            message: data.message,
        })
        }catch(error){
            next(error)
        }
    }
    async adminRefreshToken(req:Req,res:Res,next:Next){
        try {
            const incomingRefreshToken =  req.body.refreshToken
            const Tokens = await this.adminusecase.adminRefreshToken(incomingRefreshToken as string)
            const accessToken = Tokens.data?.accessToken
            const refreshToken = Tokens.data?.refreshToken
            res.status(Tokens.status)
            .cookie("adminAccessToken",accessToken,{
                httpOnly:true,
                secure:true,
                sameSite:'strict',
                maxAge: 900000 
            })
            .cookie("adminRefreshToken",refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            .json({accessToken,refreshToken });
        } catch (error) {
            next(error)
        }
    }
}