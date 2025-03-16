import { IInterviewer } from "src/interviewer/interface/interface";
import { CandidateResponseDto } from "../dtos/candidate.response.dto";
import { ICandidate, IStack } from "./interface";

export interface ICandidateController {
    getProfileImage(userId: string): Promise<{ success: boolean, message: string, profileURL: string }>
    profileCandidate(userId: string): Promise<{ success: boolean; message: string; candidateData?: CandidateResponseDto | null }>;
    editProfileCandidate(userId: string, formData: ICandidate, file?: Express.Multer.File): Promise<{ success: boolean; message: string; profileURL: string }>
    changePassword(userId: string, formData: { currentPassword: string, password: string, confirmPassword: string }): Promise<{ success: boolean; message: string; }>
    getStack(): Promise<{ success: boolean; message: string; stackData: IStack[] | null; }>;
    getInterviewerDetails(interviewerId: string): Promise<{ success: boolean, message: string, interviewerData: IInterviewer }>
}
