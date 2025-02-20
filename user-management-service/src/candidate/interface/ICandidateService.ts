import { ICandidate } from "./interface";

export interface ICandidateService {
    findCandidate(userId: string): Promise<ICandidate>;
    editProfileCandidate(userId:string, formData: ICandidate, file?: Express.Multer.File): Promise<ICandidate>;
    changePassword(userId: string, formData:  { currentPassword: string; password: string; confirmPassword: string; }): Promise<void>;
    getStack(): Promise<any>;
}