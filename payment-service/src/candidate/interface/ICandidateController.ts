import Stripe from "stripe";
import { PaymentData } from "./Interface";

export interface ICandidateController {
    paymentForBooking(candidateId: string,data: PaymentData): Promise<{ success: boolean, message: string, session: Stripe.Checkout.Session }>;
    verifyPayment(sessionId: {sessionId: string}): Promise<{success:boolean , message: string}>
}