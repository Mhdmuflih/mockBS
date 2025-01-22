import { HTTP_STATUS } from "../Constants/httpStatus";
import { MESSAGES } from "../Constants/messages";
import { IAdminRepository } from "../Interface/Admin/IAdminRepository";
import { IAdminService } from "../Interface/Admin/IAdminService";
import { generateAccessToken, generateRefreshToken } from "../JWT/jwt";
import { IAdmin } from "../Models/adminModel";

export class AdminServices implements IAdminService {
    constructor(private adminRepository: IAdminRepository) { }

    async createAdmin(name: string, mobile: string, email: string, password: string): Promise<any> {
        try {

            if (!name || !mobile || !email || !password) {
                return { success: false, message: "All fields (name, mobile, email, password) are required." };
            }

            const existAdmin = await this.adminRepository.findByEmail(email);
            if (existAdmin) {
                return { success: false, message: "Admin with this email already exists." };
            }

            await this.adminRepository.createAdmin({ name, mobile, email, password });
            // console.log(admin, ' this is admin in service')
            // return { success: true, message: "Admin Registration Successfully completed" }

            // return admin;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    async loginAdmin(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; admin: IAdmin; }> {
        try {
            const admin = await this.adminRepository.findAdminByEmail(email);
            if (!admin) {
                const error: any = new Error(MESSAGES.ADMIN_NOT_FOUND);
                error.status = HTTP_STATUS.NOT_FOUND;
                throw error;
            }

            const correctPassword = password;

            if (!correctPassword) {
                const error: any = new Error(MESSAGES.INVALID_PASSWORD);
                error.status = HTTP_STATUS.UNAUTHORIZED;
                throw error;
            }

            const accessToken = generateAccessToken(admin._id as string);
            const refreshToken = generateRefreshToken(admin._id as string);
            console.log(`accessToken: ${accessToken} and refreshToken ${refreshToken}`);

            return { accessToken, refreshToken, admin };
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    // async generateOtp(): Promise<number> {
    //     return Math.floor(1000 + Math.random() * 9999)
    // }



}