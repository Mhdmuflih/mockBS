import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Document, Model } from "mongoose";
import { IBaseRepository } from "src/Interface/IBaseRepository";

@Injectable()
export class BaseRepository<T extends Document> implements IBaseRepository {
    constructor(private readonly model: Model<T>) { }

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