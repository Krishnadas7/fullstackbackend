import IStripe from "../../usecase/interface/services/Istripe";
import { IResponse } from "../../usecase/interface/services/Iresponse";
import { Req } from "../types/expressTypes";
const successUrl = process.env.SUCCESS_PAGE_URL
console.log(successUrl,'success url======================')
import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51PjGVyRvyVQuhEWLDd7bUFqejZ7fYuZjJuIgYvvR7nnN7fkZTtnazba1V7XrMHcQEIlm7fRedATCT19oJrgYidwm00ahiByzcC' as string,{
    apiVersion: "2024-06-20"
});

class StripeService implements IStripe{
    async  createPaymentIntent(
        amount:string,
        bookingId:string,
        user_id:string
      ):Promise<IResponse> {
        console.log('dataaaas=======',amount,bookingId,user_id)
        try {
          
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: 'inr',
                  product_data: {
                    name: 'Service Payment is',
                  },
                  unit_amount: Number(amount) *100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'https://event-hive-front-end.vercel.app/user/success-page',
            cancel_url: 'https://event-hive-front-end.vercel.app/user/checkout-failed',
            metadata: { 
              bookingId,
              amount,
              user_id
            },
          });
          console.log('=ssss==s',session)
            return {
              success:true,
              status:200,
              data:session.id
            }
        } catch (error) {
          console.log('error from stripeee',error)
          throw error
        }
        
    }
    async paymentSuccess(req:Req){
        const payload = req.body;     
        const payloadString = JSON.stringify(payload, null, 2);
        const signature = req.headers["stripe-signature"];
    
        if (typeof signature !== "string") {
          return false;
        }
      
        const endpointSecret= "whsec_sVRAeuOfHtah7wpgGjooqaIMIGpomyiF";
        const header = stripe.webhooks.generateTestHeaderString({
          payload:payloadString,
          secret:endpointSecret
        });
    
        let event
           event = stripe.webhooks.constructEvent(
          payloadString,
          header,
          endpointSecret
        );
        if (event.type == "charge.succeeded") {
          return true;
        } else {
          return false;
        }
    
      }
}

export default StripeService