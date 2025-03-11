import { IAdmin } from "../../Models/adminModel";

export interface IAdminService {
    createAdmin(name: string, mobile: string, email: string, password: string): Promise<IAdmin>;
    loginAdmin(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; admin: IAdmin }>
    validateRefreshToken(token: string): Promise<{ accessToken: string; refreshToken: string; admin: IAdmin }>;
}