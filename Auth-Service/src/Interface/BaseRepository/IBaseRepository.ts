import { Document, FilterQuery } from "mongoose";

export interface IBaseRepository<T extends Document> {
    // googleAuth(data: Partial<T>): Promise<T>;
    create(data: Partial<T>): Promise<T>;
    findByEmail(email: string): Promise<any>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    deleteOTP(email: string): Promise<any>;
    changePassword(email: string, password: string): Promise<any>;
    updateOTP(email: string, otp: number): Promise<any>;
}