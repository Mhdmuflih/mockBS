import { ICandidate } from "src/candidate/interface/interface";
import { IInterviewer } from "./interface";

export interface IInterviewerRepository {
    addDetails(formData: any, files: Express.Multer.File[]): Promise<IInterviewer | null>;
    updateInterviewerData(userId: string, formData: any, fileName: string): Promise<IInterviewer | null>;
    updatePassword(userId: string, securePassword: string): Promise<IInterviewer>;
    sendInterviewer(data: any): Promise<IInterviewer[]>;
}