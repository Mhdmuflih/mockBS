import { Document, FilterQuery, Model } from "mongoose";
import { IBaseRepository } from "../Interfaces/baseRepository/IBaseRepository";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
    constructor(private readonly model: Model<T>) { }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        try {
            return this.model.findOne(filter).exec();
        } catch (error: unknown) {
            throw new Error(`Error while finding entity : ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}