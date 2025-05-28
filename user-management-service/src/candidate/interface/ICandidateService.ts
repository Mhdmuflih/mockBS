import { IInterviewer } from "src/interviewer/interface/interface";
import { CandidateDTO } from "../dtos/candidate-data.dto";
import { StackDTO } from "../dtos/stack-response.dto";
import { InterviewerDTO } from "src/interviewer/dto/interviewer-data.dto";

export interface ICandidateService {
    findCandidate(userId: string): Promise<CandidateDTO | null>;
    editProfileCandidate(userId:string, formData: any, file?: Express.Multer.File): Promise<CandidateDTO | null>;
    changePassword(userId: string, formData:  { currentPassword: string; password: string; confirmPassword: string; }): Promise<void>;
    getStack(): Promise<StackDTO[]>;
    getInterviewer(interviewerId: string): Promise<InterviewerDTO | null>;
}