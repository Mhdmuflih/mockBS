import { Document, FilterQuery, Model, Types } from "mongoose";
import { IBaseRepository } from "../Interface/BaseRepository/IBaseRepository";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {

    constructor(protected readonly model: Model<T>) { }

    async create(data: Partial<T>): Promise<T> {
        try {
            const entity = new this.model(data);
            console.log(entity, 'this is entity');
            // return entity;
            return await entity.save();
        } catch (error: unknown) {
            throw new Error(`Error while creating entity:${error instanceof Error ? error.message : String}`);
        }
    }

    async findById(id: string | Types.ObjectId): Promise<T | null> {
        try {
            return await this.model.findById(id);
        } catch (error: unknown) {
            throw new Error(`Error while creating find by id:${error instanceof Error ? error.message : String}`);
        }
    }

    async findByEmail(email: string): Promise<T> {
        try {
            const data: any = this.model.findOne({ email });
            // console.log(data, "this is the base respository data in login candidate");
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while find email:${error instanceof Error ? error.message : String}`);
        }
    }

    async deleteOTP(email: string): Promise<any> {
        try {
            return await this.model.updateOne(
                { email },
                {
                    $unset: { OTP: 1, expaireAt: 1 },
                    $set: { isVerified: true },
                }
            );
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while deleting the OTP: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async updateOTP(email: string, otp: number): Promise<any> {
        try {
            return await this.model.findOneAndUpdate({ email }, { $set: { OTP: otp, expaireAt: new Date(Date.now() + 10 * 60 * 1000) } }, { new: true });
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while update the OTP: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async changePassword(email: string, password: string): Promise<any> {
        try {
            return await this.model.findOneAndUpdate(
                { email },
                { $set: { password } },
                { new: true } // Ensure you get the updated document
            );
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while updating the password: ${error instanceof Error ? error.message : String(error)}`);
        }
    }


    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        try {
            return this.model.findOne(filter).exec();
        } catch (error: unknown) {
            throw new Error(`Error while finding entity : ${error instanceof Error ? error.message : String(error)}`);
        }
    }

}