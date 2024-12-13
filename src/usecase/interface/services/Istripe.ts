import { Req } from "../../../infrastructure/types/expressTypes";
import { IResponse } from "./Iresponse";

export interface IStripe{
createPaymentIntent(amount:string,booking_id:string,user_id:string):Promise<IResponse>;
paymentSuccess(request:Req):Promise<boolean|null>
}

export default IStripe