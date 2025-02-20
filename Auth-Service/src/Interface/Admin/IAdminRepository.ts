import { IAdmin } from "../../Models/adminModel";

export interface IAdminRepository {
    createAdmin(adminData: Partial<IAdmin>): Promise<IAdmin>;
    findAdminByEmail(email: string): Promise<IAdmin | null>;
    findByEmail(email: string): Promise<IAdmin | null>;
}