import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IAdminGroupRepository } from "src/interface/admin/IAdminRepository";
import { Group } from "src/model/group.schema";

@Injectable()
export class AdminGroupRepository implements IAdminGroupRepository {
    constructor(@InjectModel(Group.name) private readonly groupModel: Model<Group>) { }

    async getCommunity() {
        try {
            return await this.groupModel.find().exec();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}