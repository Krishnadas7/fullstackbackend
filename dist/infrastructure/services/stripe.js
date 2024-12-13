"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const successUrl = process.env.SUCCESS_PAGE_URL;
console.log(successUrl, 'success url======================');
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51PjGVyRvyVQuhEWLDd7bUFqejZ7fYuZjJuIgYvvR7nnN7fkZTtnazba1V7XrMHcQEIlm7fRedATCT19oJrgYidwm00ahiByzcC', {
    apiVersion: "2024-06-20"
});
class StripeService {
    createPaymentIntent(amount, bookingId, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('dataaaas=======', amount, bookingId, user_id);
            try {
                const session = yield stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price_data: {
                                currency: 'inr',
                                product_data: {
                                    name: 'Service Payment is',
                                },
                                unit_amount: Number(amount) * 100,
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
                console.log('=ssss==s', session);
                return {
                    success: true,
                    status: 200,
                    data: session.id
                };
            }
            catch (error) {
                console.log('error from stripeee', error);
                throw error;
            }
        });
    }
    paymentSuccess(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const payloadString = JSON.stringify(payload, null, 2);
            const signature = req.headers["stripe-signature"];
            if (typeof signature !== "string") {
                return false;
            }
            const endpointSecret = "whsec_sVRAeuOfHtah7wpgGjooqaIMIGpomyiF";
            const header = stripe.webhooks.generateTestHeaderString({
                payload: payloadString,
                secret: endpointSecret
            });
            let event;
            event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
            if (event.type == "charge.succeeded") {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.default = StripeService;
