import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Stack } from "src/admin/Model/stack.schema";
import { BaseRepository } from "src/Repository/baseRepository";
import { IInterviewerStackRepository } from "../interface/IInterviewerStackRepository";

@Injectable()
export class InterviewerStackRepository extends BaseRepository<Stack> implements IInterviewerStackRepository {
    constructor(@InjectModel(Stack.name) private readonly stackModel: Model<Stack>) {
        super(stackModel);
    }
}