import { ICandidate } from "../../Models/candidateModel";
import { IOtp } from "../../Models/otpModel";

export interface ICandidateRepository {
    saveOtp(otpData: Partial<IOtp>): Promise<IOtp | null>;
    findOtpByEmail(email: string): Promise<IOtp | null>;
    deleteOtpByEmail(email: string): Promise<void>;
    updateOtp(otpData: Partial<any>): Promise<void>;
    createCandidate(candidateData: Partial<ICandidate>): Promise<ICandidate>;
    findCandidateByEmail(email: string): Promise<ICandidate | null>;
}