import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Stack } from "src/admin/Model/stack.schema";
import { BaseRepository } from "src/Repository/baseRepository";
import { ICandidateStackRepository } from "../interface/ICandidateStackRepository";

@Injectable()
export class CandidateStackRepository extends BaseRepository<Stack> implements ICandidateStackRepository {
    constructor(@InjectModel(Stack.name) private readonly stackModel: Model<Stack>) {
        super(stackModel)
    }
}