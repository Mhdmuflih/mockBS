import { InterviewerDTO } from "../../DTO/Interviewer/interviewer.dto";
import { IInterviewer } from "../../Models/interviewerModel";

export interface IInterviewerService {
    createInterviewer(name: string, mobile: string, email: string, password: string): Promise<InterviewerDTO>
    otpVerification(otp: number, email: string): Promise<IInterviewer>;
    resendOtp(email: string, context: string): Promise<void>;
    forgotPassword(email: string): Promise<InterviewerDTO>;
    verifyEmail(email: string, otp: number): Promise<any>;
    changePassword(email: string, password: string, confirmPassword: string): Promise<any>;
    loginInterviewer(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; interviewerDTO: InterviewerDTO }>;

    validateRefreshToken(token: string): Promise<{accessToken: string, refreshToken: string, interviewerDTO: InterviewerDTO}>;

    checkIsBlock(userId: string): Promise<any>
}