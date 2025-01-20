import { ICandidate } from "../../Models/candidateModel";

export interface ICandidateService {
    createCandidate(name: string, mobile: string, email: string, password: string): Promise<ICandidate>;
    otpVerification(otp: number, email: string): Promise<ICandidate>;
    resendOtp(email: string): Promise<void>;
    loginCandidate(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; candidate: ICandidate }>;
}