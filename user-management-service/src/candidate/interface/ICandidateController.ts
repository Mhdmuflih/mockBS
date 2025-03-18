import { IInterviewer } from "src/interviewer/interface/interface";
import { ICandidate, IStack } from "./interface";
import { CandidateDataDto } from "../dtos/candidate-data.dto";
import { GetStackResponseDto } from "../dtos/stack-response.dto";

export interface ICandidateController {
    getProfileImage(userId: string): Promise<{ success: boolean, message: string, profileURL: string }>
    profileCandidate(userId: string): Promise<{ success: boolean; message: string; candidateData?: CandidateDataDto | null }>;
    editProfileCandidate(userId: string, formData: ICandidate, file?: Express.Multer.File): Promise<{ success: boolean; message: string; profileURL?: string }>
    changePassword(userId: string, formData: { currentPassword: string, password: string, confirmPassword: string }): Promise<{ success: boolean; message: string; }>
    getStack(): Promise<GetStackResponseDto>;
    getInterviewerDetails(interviewerId: string): Promise<{ success: boolean, message: string, interviewerData: IInterviewer }>
}
