import { ICandidate } from "./interface";
import { CandidateDTO } from "../dtos/candidate-data.dto";
import { StackDTO } from "../dtos/stack-response.dto";
import { InterviewerDTO } from "src/interviewer/dto/interviewer-data.dto";

export interface ICandidateController {
    getProfileImage(userId: string): Promise<{ success: boolean, message: string, profileURL: string }>
    profileCandidate(userId: string): Promise<{ success: boolean; message: string; candidateData?: CandidateDTO | null }>;
    editProfileCandidate(userId: string, formData: ICandidate, file?: Express.Multer.File): Promise<{ success: boolean; message: string; profileURL?: string }>
    changePassword(userId: string, formData: { currentPassword: string, password: string, confirmPassword: string }): Promise<{ success: boolean; message: string; }>
    getStack(): Promise<{success: boolean; message: string; stackData: StackDTO[]}>;
    getInterviewerDetails(interviewerId: string): Promise<{ success: boolean, message: string, interviewerData: InterviewerDTO }>
}
