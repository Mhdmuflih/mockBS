import { IInterviewer } from "../../Models/interviewerModel";
import { IOtp } from "../../Models/otpModel";

export interface IInterviewerRepository {
    saveOtp(otpData: Partial<IOtp>): Promise<IOtp | null>;
    findOtpByEmail(email: string): Promise<IOtp | null>;
    deleteOtpByEmail(email: string): Promise<void>;
    updateOtp(otpData: Partial<any>): Promise<void>;
    interviewerChangePassword({email, password}: {email: string, password: string | undefined}): Promise<IInterviewer>;
    createInterviewer(interviewerData: Partial<IInterviewer>): Promise<IInterviewer>;
    findInterviewerByEmail(email: string): Promise<IInterviewer | null>;
    deleteInterviewerOTP(email: string): Promise<IInterviewer | null>;
    updateInterviewerOTP(email: string, otp: number): Promise<IInterviewer | null>;

    findInterviewerById(interviewerId: string): Promise<IInterviewer | null>;
    
    // addInterviewerDetails(interviewerData: Partial<any>): Promise<IInterviewer | null>;
    // loginInterviewer(interviewerData: Partial<IInterviewer>): Promise<IInterviewer>;
}