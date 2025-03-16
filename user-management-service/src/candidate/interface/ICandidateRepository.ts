import { IInterviewer } from "src/interviewer/interface/interface";
import { ICandidate, IStack } from "./interface";

export interface ICandidateRepository {
    findOne(userId: string): Promise<ICandidate | null>;
    findCandidateByEmail(email: string): Promise<ICandidate | null>;
    updateCandidateData(userId: string, formData: ICandidate, fileName: string): Promise<ICandidate | null>;
    updatePassword(userId: string, securePassword: string): Promise<ICandidate | null>
    getStack(): Promise<IStack[] | null>;
    findInterviewer(interviewerId: string): Promise<IInterviewer | null>;
}
