import { ICandidate } from "../../Models/candidateModel";

export interface ICandidateService {
    googleAuth(googleData: any): Promise<{ accessToken: string; refreshToken: string; candidate: ICandidate }>
    createCandidate(name: string, mobile: string, email: string, password: string): Promise<ICandidate>;
    otpVerification(otp: number, email: string): Promise<ICandidate>;
    resendOtp(email: string, context: string): Promise<void>;
    forgotPassword(email: string): Promise<ICandidate | null>;
    verifyEmail(email: string, otp: number): Promise<any>;
    changePassword(email: string, password: string, confirmPassword: string): Promise<any>;
    loginCandidate(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; candidate: ICandidate }>;

    validateRefreshToken(refreshToken: string): Promise<any>;

    checkIsBlock(userId: string): Promise<any>;

}