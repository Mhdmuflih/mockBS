import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { IAdminController } from "src/interface/admin/IAdminController";
import { AdminService } from "./admin.service";

@Controller('admin')
export class AdminController implements IAdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('communities')
    async fetchCommunityData(): Promise<any> {
        try {
            const communityData = await this.adminService.getCommunity();
            console.log(communityData, 'this is community Data');
            return { success: true, message: "interview's Data", communityData: communityData }
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}