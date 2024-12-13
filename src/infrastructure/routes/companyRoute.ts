import express,{NextFunction,Request,Response} from 'express'
import { companyAdapter } from './injections/companyInjection'
import { eventAdapter } from './injections/eventInjections'
import AuthMiddleware from '../Middleware/authMiddleware'
import { upload } from '../Middleware/multer'
const router = express.Router()

router.post('/signup',(req:Request,res:Response,next:NextFunction)=>{
    companyAdapter.createCompany(req,res,next)
})
router.post('/login',(req:Request,res:Response,next:NextFunction)=>{
    companyAdapter.companyLogin(req,res,next)
})
router.post('/send-email',(req:Request,res:Response,next:NextFunction)=>{
    companyAdapter.sendEmailforCompany(req,res,next)
})
router.get('/get-company-profile',AuthMiddleware.protectCompany,(req: Request,res : Response, next: NextFunction) =>{
   companyAdapter.getCompanyProfile(req,res,next)
})
// In the backend (Express route)
router.post('/company-profile-edit',AuthMiddleware.protectCompany,upload.single('company_logo'),(req: Request, res: Response, next: NextFunction) => {
  companyAdapter.companyProfileUpdate(req,res,next)
});
router.post('/event-creation',AuthMiddleware.protectCompany,upload.single('event_poster'),(req: Request,res: Response,next: NextFunction)=>{
  eventAdapter.createEvent(req,res,next)
})
router.get('/get-all-event',(req:Request,res:Response,next:NextFunction) =>{
  eventAdapter.getCompany(req,res,next)
})
router.get('/live-events',(req:Request,res:Response,next:NextFunction) =>{
  eventAdapter.liveEvents(req,res,next)
})
router.get('/all-members',(req:Request,res:Response,next:NextFunction) =>{
  eventAdapter.allMembers(req,res,next)
})
router.post('/close-event',(req:Request,res:Response,next:NextFunction) =>{
  eventAdapter.closeEvent(req,res,next)
})
router.post('/send-bulk-email',(req:Request,res:Response,next:NextFunction) =>{
  eventAdapter.sendBulkEmail(req,res,next)
})

router.post('/refresh-token',async (req:Request,res:Response,next: NextFunction) =>{ 
    companyAdapter.companyRefreshToken(req,res,next)
})

export default router