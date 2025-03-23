import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Stack } from "src/admin/Model/stack.schema";
import { BaseRepository } from "src/Repository/baseRepository";
import { ICandidateStackRepository } from "../interface/ICandidateStackRepository";
import { StackResponseDto } from "../dtos/stack-response.dto";

@Injectable()
export class CandidateStackRepository extends BaseRepository<Stack> implements ICandidateStackRepository {
    constructor(@InjectModel(Stack.name) private readonly stackModel: Model<Stack>) {
        super(stackModel)
    }

    // async getStack(): Promise<StackResponseDto[]> {
    //     try {
    //         const getStack = await this.findAll();
    //         // const getStack = await this.stackModel.find();
    //         return getStack;
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}