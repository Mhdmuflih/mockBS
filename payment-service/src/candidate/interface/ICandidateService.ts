import Stripe from "stripe";
import { PaymentData } from "./Interface";

export interface ICandidateService {
    paymentForBooking(candidateId: string, data: PaymentData): Promise<Stripe.Checkout.Session>;
    verifyPayment(sessionId: string): Promise<{success: boolean , message: string} | void>
}