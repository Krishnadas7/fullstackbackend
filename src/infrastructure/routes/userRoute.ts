import express,{NextFunction,Request,Response} from 'express'
import { userAdapter } from './injections/userInjection'
import { eventAdapter } from './injections/eventInjections';
import { S3Client ,S3ClientConfig} from '@aws-sdk/client-s3';
import {upload} from '../Middleware/multer'
import path from 'path'
import dotenv from 'dotenv'
import AuthMiddleware from '../Middleware/authMiddleware';
import { bookingAdapter } from './injections/bookingInjection';
import { adminAdapter } from './injections/adminInjection';
const envFilePath = path.resolve(__dirname, '../../../../.env');
dotenv.config({ path: envFilePath })

const router = express.Router()

// ======
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

const s3  = new S3Client (clientConfig);

router.post('/signup',
(req:Request,res:Response,next:NextFunction)=>{
userAdapter.createUser(req,res,next)
})

router.post('/login',
(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.loginUser(req,res,next)
})
router.post('/oauth',
(req:Request,res:Response,next:NextFunction)=>{
  userAdapter.googleAuth(req,res,next)
})

router.post('/sendemailfor-forgot',
(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.sendEmailForgotPassword(req,res,next)
})
router.post(
    "/forgot-password",
    (req: Request, res: Response, next: NextFunction) =>
      userAdapter.fogotPassword(req, res, next)
  );

  router.post("/sendEmail", (req: Request, res: Response, next: NextFunction) =>
    userAdapter.sendEmail(req, res, next)
  );
  router.post('/profile-image-update',upload.single('image'),async (req:Request,res:Response,next:NextFunction)=>{
    userAdapter.profileImageUpdate(req,res,next)
  })

  router.post("/verifyEmail", (req: Request, res: Response, next: NextFunction) =>
    userAdapter.emailVerification(req, res, next)
  );
  router.post('/refresh-token',async (req, res, next) => {
    userAdapter.userRefreshToken(req,res,next)
});
router.post('/reset-password',(req: Request, res: Response, next: NextFunction)=>{
  userAdapter.resetPassword(req,res,next)
})
router.post('/token-validation',(req: Request,res: Response, next: NextFunction)=>{
  userAdapter.tokenValidation(req,res,next)
})

router.post('/profile-update',AuthMiddleware.protectUser,(req: Request, res: Response, next: NextFunction)=>{
userAdapter.profileUpdate(req,res,next)
}
)
router.get('/user-data',(req: Request,res: Response,next: NextFunction)=>
  userAdapter.userData(req,res,next)
)
router.get('/random-user-data',AuthMiddleware.protectUser,(req: Request,res: Response,next: NextFunction)=>{
  userAdapter.getRandomUser(req,res,next)
})
router.get('/get-image',(req: Request,res: Response,next: NextFunction)=>{
 userAdapter.getImage(req,res,next)
})

router.get('/all-user',AuthMiddleware.protectUser,async(req: Request, res: Response,next: NextFunction)=>{
   userAdapter.allUser(req,res,next)
})
router.get('/event-for-users',AuthMiddleware.protectUser,async(req: Request, res: Response,next: NextFunction)=>{
  eventAdapter.userEventList(req,res,next)
})
router.get('/selected-event',AuthMiddleware.protectUser,async(req: Request, res: Response,next: NextFunction)=>{
  eventAdapter.selectedEvent(req,res,next)
})
router.get('/search-event',AuthMiddleware.protectUser,async(req: Request, res: Response,next: NextFunction)=>{
  eventAdapter.searchEvent(req,res,next)
})
router.get('/filter-events',AuthMiddleware.protectUser,async(req: Request, res: Response,next: NextFunction)=>{
  eventAdapter.filterEvents(req,res,next)
})
router.post('/ticket-booking',AuthMiddleware.protectUser,async(req: Request,res : Response,next: NextFunction)=>{
  bookingAdapter.ticketBooking(req,res,next)
})
router.post('/weebhook',async(req: Request,res : Response,next: NextFunction)=>{
   console.log('webhook route is called')
  bookingAdapter.webhook(req,res,next)
})
router.get('/all-bookings',AuthMiddleware.protectUser,async(req: Request,res : Response,next: NextFunction)=>{
  console.log('all bookin',req.query.userId)
  bookingAdapter.allBookings(req,res,next)
})
router.get('/member-exist',AuthMiddleware.protectUser,async(req: Request,res : Response,next: NextFunction)=>{
  userAdapter.memberexist(req,res,next)
})
router.get('/live-checking',async(req: Request,res : Response,next: NextFunction)=>{
  bookingAdapter.liveChecking(req,res,next)
})
router.get('/live-listing',AuthMiddleware.protectUser,async(req: Request,res : Response,next: NextFunction)=>{
  bookingAdapter.liveListing(req,res,next)
})
router.get('/user-notification',async(req: Request,res : Response,next: NextFunction)=>{
  userAdapter.getNotification(req,res,next)
})
router.get('/landing-page-event-count',async(req: Request,res : Response,next: NextFunction)=>{
  adminAdapter.eventCount(req,res,next)
})
router.get('/landing-page-live-event-count',async(req: Request,res : Response,next: NextFunction)=>{
  adminAdapter.liveEventCount(req,res,next)
})
router.post('/create-report',async(req: Request,res : Response,next: NextFunction)=>{
  userAdapter.createReport(req,res,next)
})
export default router