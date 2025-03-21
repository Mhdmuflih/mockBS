import { IAdminRepository } from "../Interface/Admin/IAdminRepository";
import Admin, { IAdmin } from "../Models/adminModel";
import { BaseRepository } from "./baseRepository";

class AdminRepository extends BaseRepository<IAdmin> implements IAdminRepository {

    constructor() {
        super(Admin);
    }

    async createAdmin(adminData: Partial<IAdmin>): Promise<IAdmin>{
        try {
            return await this.model.create(adminData);
        } catch (error: unknown) {
            throw new Error(`Error while creating admin : ${error instanceof Error ? error.message : String(error)}`)
        }
    }

    async findAdminByEmail(email: string): Promise<IAdmin | null> {
        try {
            return await this.findOne({ email });
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while finding Candidate : ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async findAdminById(adminId: string): Promise<IAdmin | null> {
        try {
            return await this.findOne({_id: adminId});
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while finding Candidate : ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}

export default new AdminRepository();