import { IInterviewer } from "src/interviewer/interface/interface";
import { ICandidate, IStack } from "./interface";

export interface ICandidateService {
    findCandidate(userId: string): Promise<ICandidate | null>;
    editProfileCandidate(userId:string, formData: ICandidate, file?: Express.Multer.File): Promise<ICandidate | null>;
    changePassword(userId: string, formData:  { currentPassword: string; password: string; confirmPassword: string; }): Promise<void>;
    getStack(): Promise<IStack[] | null>;
    getInterviewer(interviewerId: string): Promise<IInterviewer | null>;
}