import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Document, FilterQuery, Model } from "mongoose";
import { IBaseRepository } from "src/interface/IBaseRepository";

@Injectable()
export class BaseRepository<T extends Document> implements IBaseRepository<T> {
    constructor(private readonly model: Model<T>) { }

    async findById(id: string): Promise<T> {
        try {
            return this.model.findById({ _id: id });
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
                        { "scheduleData.stack": { $regex: search, $options: "i" } },
                        { "scheduleData.technology": { $regex: search, $options: "i" } },
                        { "scheduleData.date": { $regex: search, $options: "i" } },
                        { "scheduleData.technology": { $regex: search, $options: "i" } },
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


    async findOneById(id: string): Promise<T | null> {
        try {
            return this.model.findById(id).exec();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}