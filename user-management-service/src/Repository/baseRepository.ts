import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Document, FilterQuery, Model } from "mongoose";
import { IBaseRepository } from "src/Interface/IBaseRepository";

@Injectable()
export class BaseRepository<T extends Document> implements IBaseRepository {
    constructor(private readonly model: Model<T>) { }


    async findWithPagination(filter: FilterQuery<T> = {}, page: number, limit: number, search?: string): Promise<{ total: number, data: T[] }> {
        try {

            if (search) {
                filter = {
                    ...filter,
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { email: { $regex: search, $options: "i" } },
                        { mobile: { $regex: search, $options: "i" } },
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

    async findAll(): Promise<T[] | null> {
        try {
            return this.model.find().exec();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        try {
            return await this.model.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // async findByEmail(email: string): Promise<T | null> {
    //     try {
    //         return this.model.findOne({email: email}).exec();
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}