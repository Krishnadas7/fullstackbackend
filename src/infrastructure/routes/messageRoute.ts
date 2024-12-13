import exprss,{Request,Response,NextFunction} from 'express'
import { messageAdapter } from './injections/messageInjection'
const router = exprss.Router()

router.post('/',(req:Request,res:Response,next: NextFunction)=>{
    console.log('router from message');
    
  messageAdapter.createMessage(req,res,next)
})
router.get('/',(req: Request,res: Response,next: NextFunction)=>{
    messageAdapter.getMessage(req,res,next)
})

export default router