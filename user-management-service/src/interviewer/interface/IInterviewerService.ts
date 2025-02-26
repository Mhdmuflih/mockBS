import { IInterviewer } from "./interface";
// import { InterviewerRequest, InterviewerResponse, InterviewerResponseList } from '../../proto/interviewer.proto'; // Adjust based on your generated types

export interface IInterviewerService {
    addDetails(formData: any, files: Express.Multer.File[]): Promise<any>;
    findInterviewer(userId: string): Promise<any>;
    editProfileInterviewer(userId: string, formData: IInterviewer, file?: Express.Multer.File): Promise<IInterviewer>;
    changePassword(userId: string, formData: { currentPassword: string; password: string; confirmPassword: string; }): Promise<void>;
    fetchStack(): Promise<void>;
    // getInterviewerData(interviewerId: string): Promise<any>;
    sendInterviewer(data: any): Promise<any>
    getCandidate(candidateId: string): Promise<any>
}