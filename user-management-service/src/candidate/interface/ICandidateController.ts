import { ICandidate } from "./interface";

export interface ICandidateController {
    getProfileImage(userId: string): Promise<{success: boolean, message: string, profileURL: string}>
    profileCandidate(userId: string): Promise<{success: boolean;message: string;candidateData?: ICandidate | null}>;
    editProfileCandidate(userId: string, formData: ICandidate, file?: Express.Multer.File): Promise<{success: boolean;message: string; profileURL: string}>
    changePassword(userId: string, formData: { currentPassword: string, password: string, confirmPassword: string }): Promise<{success: boolean;message: string;}>
    getStack(): Promise<{success: boolean;message: string; stackData: any}>;
}
