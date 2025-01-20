import { Document, FilterQuery } from "mongoose";

export interface IBaseRepository<T extends Document> {
    create(data: Partial<T>): Promise<T>;
    findByEmail(email: string): Promise<any>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
}