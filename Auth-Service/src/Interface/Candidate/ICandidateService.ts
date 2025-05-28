import { CandidateDTO } from "../../DTO/Candidate/candidate.dto";
import { ICandidate } from "../../Models/candidateModel";

export interface ICandidateService {
    googleAuth(googleData: any): Promise<{ accessToken: string; refreshToken: string; candidate: CandidateDTO }>
    createCandidate(name: string, mobile: string, email: string, password: string): Promise<CandidateDTO>;
    otpVerification(otp: number, email: string): Promise<ICandidate>;
    resendOtp(email: string, context: string): Promise<void>;
    forgotPassword(email: string): Promise<CandidateDTO>;
    verifyEmail(email: string, otp: number): Promise<any>;
    changePassword(email: string, password: string, confirmPassword: string): Promise<any>;
    loginCandidate(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; candidateDTO: CandidateDTO }>;

    validateRefreshToken(refreshToken: string): Promise<{ accessToken: string, refreshToken: string, candidateDTO: CandidateDTO }>;

    checkIsBlock(userId: string): Promise<any>;

}