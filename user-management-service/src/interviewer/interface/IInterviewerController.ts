import { IInterviewer } from "./interface";

export interface IInterviewerController {
    updateInterviewerDetails(file: Array<Express.Multer.File>, bodyData: any): Promise<any>;
    profileInterviewer(userId: string): Promise<{ success: boolean; message: string; interviewerData?: any }>;
    editProfileInterviewer(userId: string, formData: IInterviewer, file?: Express.Multer.File): Promise<{ success: boolean; message: string; }>
    changePassword(userId: string, formData: { currentPassword: string, password: string, confirmPassword: string }): Promise<any>;
    fetchStackData(): Promise<{success: boolean, message: string, stackData: any}>;
}