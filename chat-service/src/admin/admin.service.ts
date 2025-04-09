import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IAdminService } from "src/interface/admin/IAdminService";
import { AdminGroupRepository } from "./admin.repository";
import { AdminMessageRepository } from "./admin.message.repository";

@Injectable()
export class AdminService implements IAdminService {
    constructor(
        private readonly adminGroupRepository: AdminGroupRepository,
        private readonly adminMessageRepository: AdminMessageRepository
    ) { }

    async getCommunity() {
        try {
            const data = await this.adminGroupRepository.getCommunity();
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}