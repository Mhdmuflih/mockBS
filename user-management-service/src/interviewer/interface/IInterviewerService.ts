import { IInterviewer } from "./interface";

export interface IInterviewerService {
    addDetails(formData: any, files: Express.Multer.File[]): Promise<any>;
    findInterviewer(userId: string): Promise<any>;
    editProfileInterviewer(userId: string, formData: IInterviewer, file?: Express.Multer.File): Promise<void>;
    changePassword(userId: string, formData: { currentPassword: string; password: string; confirmPassword: string; }): Promise<void>;
    fetchStack(): Promise<void>;
}