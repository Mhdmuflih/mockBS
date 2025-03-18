import { ICandidate } from "src/candidate/interface/interface";
import { ChagnePasswordDTO } from "../dto/change-password.dto";
import { InterviewerDataDto, UpdateInterviewerDto } from "../dto/interviewer-data.dto";
import { GetStackResponseDto } from "../dto/stack-response.dto";
import { IInterviewer } from "./interface";

export interface IInterviewerController {
    getProfileImage(userId: string): Promise<{success: boolean, message: string, profileURL: string}>
    updateInterviewerDetails(file: Array<Express.Multer.File>, bodyData: UpdateInterviewerDto): Promise<{ success: boolean, message: string, interviewerData: UpdateInterviewerDto }>;
    profileInterviewer(userId: string): Promise<{ success: boolean; message: string; interviewerData?: InterviewerDataDto }>;
    editProfileInterviewer(userId: string, formData: UpdateInterviewerDto, file?: Express.Multer.File): Promise<{ success: boolean; message: string; profileURL:string }>
    changePassword(userId: string, formData: ChagnePasswordDTO): Promise<{success: boolean, message: string}>;
    fetchStackData(): Promise<GetStackResponseDto>;
    getCandidateData(candidateId: string):Promise<{success: boolean; message: string; candidateData: ICandidate}>
    getInterviewerData(interviewerId: string): Promise<{interviewers: InterviewerDataDto[]}>;
}