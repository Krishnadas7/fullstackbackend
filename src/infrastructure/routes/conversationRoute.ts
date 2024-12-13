import exprss,{Request,Response,NextFunction} from 'express'
import { conversationAdapter } from './injections/conversationInjection'
const router = exprss.Router()

router.post('/',(req: Request,res: Response,next: NextFunction)=>{
    console.log('conver route')
    conversationAdapter.addConversation(req,res,next)
})
router.get('/',(req: Request,res: Response,next: NextFunction)=>{
    conversationAdapter.getConversation(req,res,next)
})

export default router