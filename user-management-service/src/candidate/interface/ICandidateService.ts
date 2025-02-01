import { ICandidate } from "./interface";

export interface ICandidateService {
    findCandidate(userId: string): Promise<ICandidate>;
    editProfileCandidate(userId:string, formData: ICandidate, file?: Express.Multer.File): Promise<void>;
    changePassword(userId: string, formData:  { currentPassword: string; password: string; confirmPassword: string; }): Promise<void>;
}