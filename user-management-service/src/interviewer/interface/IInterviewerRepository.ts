import { IInterviewer } from "./interface";

export interface IInterviewerRepository {
    addDetails(formData: any, files: Express.Multer.File[]): Promise<any>;
    findInterviewerByEmail(email: string): Promise<any>;
    findOne(userId: string): Promise<IInterviewer | null>;
    updateInterviewerData(userId: string, formData: IInterviewer, fileName: string): Promise<IInterviewer | null>;
    updatePassword(userId: string, securePassword: string): Promise<any>;
    fetchStack(): Promise<any>;
    sendInterviewer(data: any): Promise<any>;
    getCandidate(candidateId: string): Promise<any>;
}