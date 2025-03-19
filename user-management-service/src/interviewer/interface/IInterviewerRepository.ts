import { ICandidate } from "src/candidate/interface/interface";
import { InterviewerDataDto, UpdateInterviewerDto } from "../dto/interviewer-data.dto";
import { StackResponseDto } from "../dto/stack-response.dto";
import { IInterviewer } from "./interface";

export interface IInterviewerRepository {
    addDetails(formData: InterviewerDataDto, files: Express.Multer.File[]): Promise<InterviewerDataDto | null>;
    // findInterviewerByEmail(email: string): Promise<InterviewerDataDto | null>;
    findOne(userId: string): Promise<InterviewerDataDto | null>;
    updateInterviewerData(userId: string, formData: UpdateInterviewerDto, fileName: string): Promise<UpdateInterviewerDto | null>;
    updatePassword(userId: string, securePassword: string): Promise<InterviewerDataDto>;
    fetchStack(): Promise<StackResponseDto[]>;
    // getCandidate(candidateId: string): Promise<ICandidate>;
    sendInterviewer(data: any): Promise<InterviewerDataDto[]>;
}