import { Next, Res, Req } from "../infrastructure/types/expressTypes";
import { UserUseCase } from "../usecase/usecase/useruseCase";

export class UserAdapter {
    private readonly userusecase: UserUseCase;

    constructor(userusecase: UserUseCase) {
        this.userusecase = userusecase;
    }

    async createUser(req: Req, res: Res, next: Next) {
      
     try {
         const newUser = await this.userusecase.createUser(req.body);
 
         if (newUser ) {
             res.status(newUser.status).json({
                 success: newUser.success,
                 message: newUser.message,
                 user: newUser.data,
             });
         }
     } catch (error) {
         next(error);
     }
 }

 async loginUser(req: Req, res: Res, next: Next) {
  try {
      const user = await this.userusecase.loginUser(req.body);
      console.log('user====',user);
      
      if (user) {
        res.cookie("userAccessToken", user.userAccessToken, {
          httpOnly:true,
          secure:true,
          sameSite: "strict",
          maxAge:  900000
      });
          res.cookie("userRefreshToken", user.userRefreshToken, {
              httpOnly: true,
              secure:true,
              sameSite: "strict",
              maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
          });
      }

      res.status(user.status).json({
          success: user.success,
          data: user.data,
          message: user.message,
          userAccessToken:user.userAccessToken,
          userRefreshToken:user.userRefreshToken
      });
  } catch (error) {
      // Handle errors
      next(error)
  }
}

async googleAuth (req:Req,res:Res,next:Next){
  try {
    
    const user = await this.userusecase.googleAuth(req.body)
    if (user) {
      res.cookie("userAccessToken", user.userAccessToken, {
        httpOnly:true,
        secure:true,
        sameSite: "strict",
        maxAge:  900000
    });
        res.cookie("userRefreshToken", user.userRefreshToken, {
            httpOnly: true,
            secure:true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
        });
    }
     res.status(user.status).json({
        success:user.success,
        data:user.data,
        message:user.message,
        accessToken:user.userAccessToken,
        refreshToken:user.userRefreshToken
    })
  } catch (error) {
    next(error)
  }
}

  
 async sendOtpForgotPassword(req:Req,res:Res,next:Next){
    try {
        const user = await this.userusecase.sendEmailFogotPassword(req.body);
        res.status(user.status).json({
          success: user.success,
          message: user.message,
        });
      } catch (err) {
        next(err);
      }
 }
 async tokenValidation(req:Req, res:Res ,next: Next){
    try {
      const token = await this.userusecase.tokenValidation(req.body)
      res.status(token.status).json({
        success:token.success,
        message:token.message
      })
    } catch (error) {
       next(error)
    }
 }

 async sendEmail(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.verifyEmail(req.body);
      
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
 

  async emailVerification(req: Req, res: Res, next: Next) {
    try {
      console.log(req.body);
      
      const user = await this.userusecase.emailVeification(req.body);
      
      user &&
        res.status(user.status).json({
          success: user.success,
          // data: user.data,
          message: user.message,
        });
    } catch (err) {
      
      next(err);
    }
  }

  async sendEmailForgotPassword(req: Req, res: Res, next: Next) {
    try {
      let userAccessToken = req.cookies.userAccessToken
      const user = await this.userusecase.sendEmailFogotPassword(req.body);
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (err) {
      next(err);
    }
}
    async fogotPassword(req: Req, res: Res, next: Next) {
        try {
          const newUser = await this.userusecase.forgotPassword(req.body);
          newUser &&
            res.cookie("userjwt", newUser, {
              httpOnly: true,
              sameSite: "none", // Prevent CSRF attacks
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
    
          res.status(newUser.status).json({
            success: newUser.success,
            message: newUser.message,
            user: newUser.data,
          });
        } catch (err) {
          next(err);
        }
      }
      async profileImageUpdate( req:Req ,res: Res , next: Next) {
        try {
          console.log(req.file)
          const obj={
            image:req.file,
            id:req.body.id,
            email:req.body.email
          }
          const imageUpdate = await this.userusecase.uploadProfileImage(obj)

          res.status(imageUpdate.status).json({
            success: imageUpdate.success,
            message: imageUpdate.message,
            data: imageUpdate.data
          });
        } catch (error) {
          next(error)
        }
       

      }
    async resetPassword(req: Req,res: Res,next: Next){
      try {
        const passwordUpdated = await this.userusecase.resetPassword(req.body)
        res.status(passwordUpdated.status).json({
        success:passwordUpdated.success,
        message:passwordUpdated.message,
        data:passwordUpdated.data
        })
      } catch (error) {
        next(error)
      }
    }
    async profileUpdate(req: Req,res: Res, next: Next){
      const token = req.cookies.userAccessToken
      console.log('user access token from adapter',token)
      const {first_name,last_name,qualification,bio,socialmedialink1,socialmedialink2} = req.body
      let obj={
        first_name,
        last_name,
        qualification,
        bio,
        socialmedialink1,
        socialmedialink2,
        token
      }
      try {
        req.body.token=token
        const profileUpdate = await this.userusecase.updateProfile(obj)
        res.status(profileUpdate.status).json({
          success:profileUpdate.success,
          message:profileUpdate.message,
          data:profileUpdate.data
        })
      } catch (error) {
        next(error)
      }
     
      
    }
    async userData (req: Req,res: Res,next: Next){
      try {
        const email = req.query.email 
        const user = await this.userusecase.userData(email as string)
        res.status(user.status).json({
          success:user.success,
          message:user.message,
          data:user.data
        })
      } catch (error) {
        next(error)
      }
    }
    async getRandomUser (req: Req,res: Res,next: Next){
      try {
        const userId = req.query.userId 
        const user = await this.userusecase.getRandomUser(userId as string)
        res.status(user.status).json({
          success:user.success,
          message:user.message,
          data:user.data
        })
      } catch (error) {
        next(error)
      }
    }

    async getImage(req: Req, res: Res, next: Next) {
      try {
        const email = req.query.email;
        const getUserImage = await this.userusecase.getImage(email as string);
        return res.status(getUserImage.status).json({
          success: getUserImage.success,
          message: getUserImage.message,
          data: getUserImage.data
        });
      } catch (error) {
         next(error);
      }
    }
    async memberexist(req:Req, res:Res, next:Next) {
      try {
        const userId = req.query.userId as string
        const email = req.query.email as string
        const member = await this.userusecase.memberExist(userId,email)
        return res.status(member.status).json({
          success: member.success,
          message: member.message,
          data: member.data
        });
      } catch (error) {
        next(error)
      }
    }
    async getNotification(req:Req, res:Res, next:Next){
      try {
        const getN = await this.userusecase.getNotification(req.cookies.userRefreshToken)
        return res.status(getN.status).json({
          success: getN.success,
          message: getN.message,
          data: getN.data
        });
      } catch (error) {
        next(error) 
      }
    }
    async allUser(req:Req, res:Res, next:Next){
      const users = await this.userusecase.allUsers()
      return res.status(users.status).json({
        success: users.success,
        message: users.message,
        data: users.data
      });
    }
    async createReport(req:Req, res:Res, next:Next){
      try {
        const report = await this.userusecase.createReport(req.body)
        return res.status(report.status).json({
          success: report.success,
          message: report.message,
          data: report.data
        });
      } catch (error) {
        next(error)
      }
    }
    async userRefreshToken(req:Req, res:Res, next:Next){
      try {
        const incomingRefreshToken = req.body.refreshToken
        const tokens = await this.userusecase.userRefreshToken(incomingRefreshToken)
        const accessToken=tokens.data?.accessToken
        const refreshToken=tokens.data?.refreshToken
        res.status(tokens.status)
       .cookie("userAccessToken",accessToken,{
        httpOnly:true,
        secure:true,
        sameSite:'none',
        maxAge: 900000
       })
       .cookie("userRefreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'none',
        maxAge: 30 * 24 * 60 * 60 * 1000
       })
       .json({accessToken,refreshToken });
      } catch (error) {
        next(error)
      }
    }
    
   
}
