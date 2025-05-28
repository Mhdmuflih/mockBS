import Stripe from "stripe";
import { PaymentData } from "./Interface";
import { CandidateWalletDTO } from "../dto/candidate.wallet.dto";

export interface ICandidateController {
    paymentForBooking(candidateId: string, data: PaymentData): Promise<{ success: boolean, message: string, session: Stripe.Checkout.Session }>;
    verifyPayment(sessionId: { sessionId: string }): Promise<{ success: boolean, message: string }>
    walletPaymentForBooking(candidateId: string, data: PaymentData): Promise<{ success: boolean, message: string, }>
    takeThePremium(candidateId: string, body: { amount: number, duration: string }): Promise<{ success: boolean, message: string, session: Stripe.Checkout.Session }>
    verifyPremiumPayment(candidateId: string, sessionId: { sessionId: string }): Promise<{ success: boolean, message: string }>
    getCandidateTotalAmount(candidateId: string): Promise<{ success: boolean, message: string, totalAmount: any }>
    cancelInterview(id: string, candidateId: string): Promise<{ success: boolean, message: string }>
    snedMoneyInterviewer(scheduleId: string, candidateId: string): Promise<{ success: boolean, message: string }>
}