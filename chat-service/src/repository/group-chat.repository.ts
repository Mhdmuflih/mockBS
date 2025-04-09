import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IGroupChatRepositoy } from "src/interface/IGroupChatRepositoy";
import { Group } from "src/model/group.schema";

@Injectable()
export class GroupChatRepoitory implements IGroupChatRepositoy {
    constructor(@InjectModel(Group.name) private readonly groupModel: Model<Group>) { }

    async findGroup(groupName: string): Promise<any> {
        try {
            return this.groupModel.findOne({ name: groupName });
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createGroup(candidateId: string, groupName: string): Promise<any> {
        try {
            const createGroup = new this.groupModel({
                name: groupName,
                members: [{ candidateId: candidateId, role: "admin" }]
            });
            return await createGroup.save();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async findGroups() {
        try {
            return await this.groupModel.find();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findTheExisitingMember(candidateId: string, groupName: string) {
        try {
            const group = await this.groupModel.findOne({
                name: groupName,
                "members.candidateId": candidateId
            });
            console.log(group, 'this is existing group');
            return group ? true : false
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async joinMember(candidateId: string, groupName: string) {
        try {
            const joinMember = await this.groupModel.findOneAndUpdate(
                { name: groupName },
                {
                    $push: { members: { candidateId: candidateId, role: "member" } }
                },
                { new: true }
            );
            if (!joinMember) {
                throw new HttpException("Group not found", HttpStatus.NOT_FOUND);
            }
            return joinMember;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}