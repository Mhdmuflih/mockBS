import { IInterviewer } from "./interface";

export interface IInterviewerRepository {
    addDetails(formData: any, files: Express.Multer.File[]): Promise<any>;
    findOne(userId: string): Promise<any>;
    updateInterviewerData(userId: string, formData: IInterviewer, fileName: string): Promise<any>;
    updatePassword(userId: string, securePassword: string): Promise<any>;
    fetchStack(): Promise<any>;
}