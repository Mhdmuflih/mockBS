import { IInterviewer } from "src/interviewer/interface/interface";
import { ICandidate, IStack } from "./interface";
import {  StackResponseDto } from "../dtos/stack-response.dto";
import { CandidateDataDto, UpdateCandidateDto } from "../dtos/candidate-data.dto";

export interface ICandidateRepository {
    findOne(userId: string): Promise<CandidateDataDto | null>;
    findCandidateByEmail(email: string): Promise<CandidateDataDto | null>;
    updateCandidateData(userId: string, formData: UpdateCandidateDto, fileName: string): Promise<UpdateCandidateDto | null>;
    updatePassword(userId: string, securePassword: string): Promise<CandidateDataDto | null>
    getStack(): Promise<StackResponseDto[]>;
    findInterviewer(interviewerId: string): Promise<IInterviewer | null>;
}
