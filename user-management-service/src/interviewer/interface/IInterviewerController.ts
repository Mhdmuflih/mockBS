import { ICandidate } from "src/candidate/interface/interface";
import { ChagnePasswordDTO } from "../dto/change-password.dto";
import { InterviewerDTO } from "../dto/interviewer-data.dto";
import { StackDTO } from "../dto/stack-response.dto";
import { IInterviewer } from "./interface";

export interface IInterviewerController {
    getProfileImage(userId: string): Promise<{success: boolean, message: string, profileURL: string}>
    updateInterviewerDetails(file: Array<Express.Multer.File>, bodyData: any): Promise<{ success: boolean, message: string, interviewerData: InterviewerDTO }>;
    profileInterviewer(userId: string): Promise<{ success: boolean; message: string; interviewerData?: InterviewerDTO }>;
    editProfileInterviewer(userId: string, formData: any, file?: Express.Multer.File): Promise<{ success: boolean; message: string; profileURL:string }>
    changePassword(userId: string, formData: ChagnePasswordDTO): Promise<{success: boolean, message: string}>;
    fetchStackData(): Promise<{success: boolean; message: string; stackData: StackDTO[]}>;
    getCandidateData(candidateId: string):Promise<{success: boolean; message: string; candidateData: ICandidate}>
    getInterviewerData(interviewerId: string): Promise<{interviewers: IInterviewer[]}>;
}