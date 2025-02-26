import { IInterviewer } from "src/interviewer/interface/interface";
import { ICandidate } from "./interface";

export interface ICandidateRepository {
    findOne(userId: string): Promise<ICandidate | null>;
    findCandidateByEmail(email: string): Promise<ICandidate>;
    updateCandidateData(userId: string, formData: ICandidate, fileName: string): Promise<ICandidate | null>;
    updatePassword(userId: string, securePassword: string): Promise<ICandidate>
    getStack(): Promise<any>;
    findInterviewer(interviewerId: string): Promise<IInterviewer>;
}
