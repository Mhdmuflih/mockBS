import { IInterviewer } from "src/interviewer/interface/interface";
import { ICandidate, IStack } from "./interface";
import { CandidateDataDto, UpdateCandidateDto } from "../dtos/candidate-data.dto";
import { StackResponseDto } from "../dtos/stack-response.dto";
import { InterviewerDataDto } from "src/interviewer/dto/interviewer-data.dto";

export interface ICandidateService {
    findCandidate(userId: string): Promise<CandidateDataDto | null>;
    editProfileCandidate(userId:string, formData: UpdateCandidateDto, file?: Express.Multer.File): Promise<UpdateCandidateDto | null>;
    changePassword(userId: string, formData:  { currentPassword: string; password: string; confirmPassword: string; }): Promise<void>;
    getStack(): Promise<StackResponseDto[]>;
    getInterviewer(interviewerId: string): Promise<InterviewerDataDto | null>;
}