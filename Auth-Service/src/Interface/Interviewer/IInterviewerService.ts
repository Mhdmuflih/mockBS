import { IInterviewer } from "../../Models/interviewerModel";

export interface IInterviewerService {
    createInterviewer(name: string, mobile: string, email: string, password: string): Promise<any>
    otpVerification(otp: number, email: string): Promise<IInterviewer>;
    resendOtp(email: string, context: string): Promise<void>;
    forgotPassword(email: string): Promise<IInterviewer | null>;
    verifyEmail(email: string, otp: number): Promise<any>;
    changePassword(email: string, password: string, confirmPassword: string): Promise<any>;
    loginInterviewer(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; interviewer: IInterviewer }>;
    // addDetails(experience: number, designation: string, organization: string, university: string, introduction: string, email: string): Promise<IInterviewer | null>;
}