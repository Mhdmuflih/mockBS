import { ICandidate } from "../../Models/candidateModel";
import { IOtp } from "../../Models/otpModel";

export interface ICandidateRepository {
    saveOtp(otpData: Partial<IOtp>): Promise<IOtp | null>;
    findOtpByEmail(email: string): Promise<IOtp | null>;
    deleteOtpByEmail(email: string): Promise<void>;
    updateOtp(otpData: Partial<any>): Promise<void>;
    candidateChangePassword({ email, password }: { email: string, password: string | undefined }): Promise<ICandidate>;
    // createCandidateWithGoogle(candidateData: Partial<ICandidate>): Promise<ICandidate>;
    createCandidate(candidateData: Partial<ICandidate>): Promise<ICandidate>;
    findCandidateByEmail(email: string): Promise<ICandidate | null>;
    deleteCandidateOTP(email: string): Promise<ICandidate | null>;
    updateCandidateOTP(email: string, otp: number): Promise<ICandidate | null>;

    findCandidateById(candidateId: string): Promise<ICandidate | null>;
}