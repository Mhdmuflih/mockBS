import { Document, FilterQuery, Model } from "mongoose";
import { IBaseRepository } from "../Interface/BaseRepository/IBaseRepository";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {

    constructor(protected readonly model: Model<T>) { }

    async create(data: Partial<T>): Promise<T> {
        try {
            const entity = new this.model(data);
            // return entity;
            return await entity.save();
        } catch (error: unknown) {
            throw new Error(`Error while creating entity:${error instanceof Error ? error.message : String}`);
        }
    }

    async findByEmail(email: string): Promise<any> {
        try {
            const data = this.model.findOne({email});
            console.log(data, "this is the base respository data in login candidate");
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while find email:${error instanceof Error ? error.message : String}`);
        }
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        try {
            return this.model.findOne(filter).exec();
        } catch (error:unknown) {
            throw new Error(`Error while finding entity : ${error instanceof Error?error.message:String(error)}`);
        }
    }

}