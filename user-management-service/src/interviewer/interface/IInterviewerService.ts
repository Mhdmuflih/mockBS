import { ICandidate } from "src/candidate/interface/interface";
import { ChagnePasswordDTO } from "../dto/change-password.dto";
import { InterviewerDTO } from "../dto/interviewer-data.dto";
import { StackDTO } from "../dto/stack-response.dto";
import { IInterviewer } from "./interface";

export interface IInterviewerService {
    findInterviewer(userId: string): Promise<InterviewerDTO>;
    addDetails(formData: any, files: Express.Multer.File[]): Promise<InterviewerDTO>;
    editProfileInterviewer(userId: string, formData: any, file?: Express.Multer.File): Promise<InterviewerDTO>;
    changePassword(userId: string, formData: ChagnePasswordDTO): Promise<void>;
    fetchStack(): Promise<StackDTO[]>;
    getCandidate(candidateId: string): Promise<ICandidate>
    sendInterviewer(data: any): Promise<IInterviewer[]>
}