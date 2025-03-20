import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Stack } from "src/admin/Model/stack.schema";
import { BaseRepository } from "src/Repository/baseRepository";
import { IInterviewerStackRepository } from "../interface/IInterviewerStackRepository";
import { StackResponseDto } from "../dto/stack-response.dto";

@Injectable()
export class InterviewerStackRepository extends BaseRepository<Stack> implements IInterviewerStackRepository {
    constructor(@InjectModel(Stack.name) private readonly stackModel: Model<Stack>) {
        super(stackModel);
    }

    async fetchStack(): Promise<StackResponseDto[]> {
        try {
            const stack = await this.findAll();
            return stack;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}