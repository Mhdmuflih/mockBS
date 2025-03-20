import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Document, FilterQuery, Model } from "mongoose";
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
            return await this.model.find(filter);
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findWithPagination(filter: FilterQuery<T> = {}, page: number, limit: number, search?: string): Promise<{ total: number, data: T[] }> {
        try {

            if (search) {
                filter = {
                    ...filter,
                    $or: [
                        { "scheduledSlot.technology": { $regex: search, $options: "i" } },
                        { "scheduledSlot.title": { $regex: search, $options: "i" } },
                        { "scheduledSlot.date": { $regex: search, $options: "i" } },
                        { "scheduledSlot.stack": { $regex: search, $options: "i" } },
                        { "stack.stackName": { $regex: search, $options: "i" } },
                        { "stack.technologies": { $regex: search, $options: "i" } },
                        { "slots.schedules.title": { $regex: search, $options: "i" } },
                        { "slots.schedules.description": { $regex: search, $options: "i" } },
                        { "status": { $regex: search, $options: "i" } },
                    ],
                };
            }

            const total = await this.model.countDocuments(filter).exec();
            const data = await this.model.find(filter).skip((page - 1) * limit).limit(limit).exec();
            return { total: total, data: data };
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}