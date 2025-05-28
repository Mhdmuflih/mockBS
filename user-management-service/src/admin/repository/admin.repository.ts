import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IStack } from "src/candidate/interface/interface";
import { Stack } from "../Model/stack.schema";
import { IAdminRepository } from "../interface/IAdminRepository";
import { BaseRepository } from "src/Repository/baseRepository";

@Injectable()
export class AdminRepository extends BaseRepository<Stack> implements IAdminRepository {
    constructor(
        @InjectModel(Stack.name) private readonly stackModel: Model<Stack>
    ) {
        super(stackModel);
    }
    async addStack(formData: any): Promise<IStack> {
        try {
            const existingStack = await this.stackModel.findOne({ stackName: formData.stackName });
            if (existingStack) {
                throw new BadRequestException('This stack Name is already existing.');
            }

            const stack = new this.stackModel(formData);
            return await stack.save();
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllStack(): Promise<IStack[]> {
        try {
            const stack = await this.findAll();
            return stack;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}