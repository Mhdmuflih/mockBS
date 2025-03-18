import { ICandidate } from "src/candidate/interface/interface";
import { ChagnePasswordDTO } from "../dto/change-password.dto";
import { InterviewerDataDto, UpdateInterviewerDto } from "../dto/interviewer-data.dto";
import { StackResponseDto } from "../dto/stack-response.dto";
import { IInterviewer } from "./interface";
// import { InterviewerRequest, InterviewerResponse, InterviewerResponseList } from '../../proto/interviewer.proto'; // Adjust based on your generated types

export interface IInterviewerService {
    findInterviewer(userId: string): Promise<InterviewerDataDto>;
    addDetails(formData: UpdateInterviewerDto, files: Express.Multer.File[]): Promise<UpdateInterviewerDto>;
    editProfileInterviewer(userId: string, formData: UpdateInterviewerDto, file?: Express.Multer.File): Promise<UpdateInterviewerDto>;
    changePassword(userId: string, formData: ChagnePasswordDTO): Promise<void>;
    fetchStack(): Promise<StackResponseDto[]>;
    getCandidate(candidateId: string): Promise<ICandidate>
    sendInterviewer(data: any): Promise<InterviewerDataDto[]>
}