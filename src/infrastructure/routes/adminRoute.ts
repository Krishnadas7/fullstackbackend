import exprss,{Request,Response,NextFunction} from 'express'
import { adminAdapter } from './injections/adminInjection'
import { eventAdapter } from './injections/eventInjections';
import { bookingAdapter } from './injections/bookingInjection';
import { companyAdapter } from './injections/companyInjection';
import AuthMiddleware from '../Middleware/authMiddleware';

const router = exprss.Router();

router.post('/admin-login',(req:Request,res:Response,next: NextFunction) =>{
        adminAdapter.loginAdmin(req,res,next)
}
)
router.post('/refresh-token',async (req:Request,res:Response,next: NextFunction) =>{ 
    adminAdapter.adminRefreshToken(req,res,next)
})

router.get('/get-user',AuthMiddleware.protectAdmin,(req:Request,res:Response,next:NextFunction) =>{
    adminAdapter.getUsers(req,res,next)
})

router.patch('/user/block-unblock',AuthMiddleware.protectAdmin,
(req:Request,res:Response,next:NextFunction) =>
    adminAdapter.blockUnblock(req,res,next)
)
router.get('/get-events-with-company',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  eventAdapter.eventWithCompany(req,res,next)
})
router.patch('/event-block',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  eventAdapter.blockEvent(req,res,next)
})
router.get('/all-company',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  companyAdapter.getAllCompany(req,res,next)
})
router.patch('/block-company',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  companyAdapter.blockCompany(req,res,next)
})
router.get('/users-count',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  adminAdapter.userCount(req,res,next)
})
router.get('/event-count',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  adminAdapter.eventCount(req,res,next)
})
router.get('/live-event-count',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  adminAdapter.liveEventCount(req,res,next)
})
router.get('/pie-chart-data',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  adminAdapter.piechartData(req,res,next)
})
router.get('/filter-users',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  adminAdapter.filterUser(req,res,next)
})
router.get('/today-sales',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  bookingAdapter.todaySales(req,res,next)
})
router.get('/total-sales',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  bookingAdapter.totalSales(req,res,next)
})
router.get('/filter-sales-report',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  bookingAdapter.filterSalesReport(req,res,next)
})
router.get('/complete-report',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  adminAdapter.completeReport(req,res,next)
})
export default router