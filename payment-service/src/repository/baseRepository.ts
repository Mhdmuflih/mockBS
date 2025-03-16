import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Document, Model } from "mongoose";
import { IBaseRepository } from "src/interface/IBaseRepository";

@Injectable()
export class BaseRepository<T extends Document> implements IBaseRepository<T> {
    constructor(private readonly model: Model<T>) {}

    async findById(id: string): Promise<T> {
        try {
            return this.model.findById({_id: id});
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}