import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Document, Model } from "mongoose";
import { IBaseRepository } from "src/interface/IBaseRepository";

@Injectable()
export class BaseRepository<T extends Document> implements IBaseRepository {
    constructor(private readonly model: Model<T>) { }

    async createData(data: Partial<T>): Promise<T> {
        try {
            const createdEntity = new this.model(data);
            return createdEntity.save();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(id: string): Promise<T> {
        try {
            return await this.model.findOne({ id });
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(filter: Record<string, any> = {}): Promise<T[]> {
        try {
            return await this.model.find( filter );
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}