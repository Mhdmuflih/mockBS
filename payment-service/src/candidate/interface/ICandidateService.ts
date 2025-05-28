import Stripe from "stripe";
import { PaymentData } from "./Interface";
import { CandidateWalletDTO } from "../dto/candidate.wallet.dto";

export interface ICandidateService {
    paymentForBooking(candidateId: string, data: PaymentData): Promise<Stripe.Checkout.Session>;
    verifyPayment(sessionId: string): Promise<{ success: boolean, message: string } | void>
    walletPaymentForBooking(candidateId: string, data: any): Promise<void>
    takeThePremium(candidateId: string, premiumData: { amount: number, duration: string }): Promise<Stripe.Checkout.Session>
    verifyPremiumPayment(candidateId: string, sessionId: string): Promise<void>
    getCandidateTotalAmount(candidateId: string): Promise<{ total: number, walletData: CandidateWalletDTO }>
    cancelInterview(candidateId: string, id: string): Promise<any>
    sendMoney(candidateId: string, scheduleId: string): Promise<any>
}