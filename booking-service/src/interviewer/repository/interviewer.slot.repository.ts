import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InterviewerSlot } from "../model/interviewer-slot.schema";
import { Model, Types } from "mongoose";
import { IInterviewerSlotRepository } from "../interface/IInterviewerSlotRepository";
import { BaseRepository } from "src/repository/base.respository";
import { IInterviewerSlot } from "../../interface/interface";

@Injectable()
export class interviewerSlotRepository extends BaseRepository<InterviewerSlot> implements IInterviewerSlotRepository {
    constructor(
        @InjectModel(InterviewerSlot.name) private readonly slotModel: Model<InterviewerSlot>
    ) {
        super(slotModel)
    }

    async create(interviewerId: string, formData: any): Promise<IInterviewerSlot> {
        try {

            return await this.createData({
                interviewerId: new Types.ObjectId(interviewerId),
                stack: formData.stack,
                slots: formData.slots
            } as Partial<IInterviewerSlot>)

            // const newSlot = new this.slotModel({
            //     interviewerId: interviewerId,
            //     stack: formData.stack,
            //     slots: formData.slots
            // });

            // const savedSlot = await newSlot.save();
            // return savedSlot;

        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateScheduleData(interviewerId: string, updatedSchedule: any, date: any): Promise<IInterviewerSlot> {
        try {
            // console.log("Updating Schedule:", interviewerId, updatedSchedule, date);
            // console.log(updatedSchedule.slots[0].date)
            // console.log(updatedSchedule.slots[0].schedules, 'this is schedules')
            // // console.log(updatedSchedule.stack.stackName,' stack name')

            const updatedData = await this.slotModel.findOneAndUpdate(
                {
                    interviewerId: interviewerId,
                    'stack.stackName': updatedSchedule.stack.stackName,
                    'stack.technologies': updatedSchedule.stack.technologies,
                    'slots.date': date
                },
                {
                    $push: { "slots.$.schedules": { $each: updatedSchedule.slots[0].schedules } }
                },
                { new: true }
            );

            return updatedData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getSlot(interviewerId: string): Promise<IInterviewerSlot[]> {
        try {
            const slotData = await this.slotModel.find({ interviewerId: interviewerId })
            return slotData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // async getAllSlots(interviewerId: string, page: number, limit: number, search: string): Promise<{ total: number, data: IInterviewerSlot[] }> {
    //     try {
    //         const slots = await this.findWithPagination({ interviewerId }, page, limit, search);
    //         return slots
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
     async updateScheduleDataStatusCancelled(scheduledId: string): Promise<any> {
        try {
            const updateData = await this.slotModel.updateOne(
                {
                    "slots.schedules._id": scheduledId // Find the specific schedule
                },
                {
                    $set: { "slots.$[].schedules.$[sched].status": "cancelled" } // Update status to "booked"
                },
                {
                    arrayFilters: [{ "sched._id": scheduledId }] // Apply filter to target correct schedule
                }
            );

            if (updateData.matchedCount === 0) {
                throw new HttpException("Schedule not found", HttpStatus.NOT_FOUND);
            }

            return { success: true, message: "Schedule status updated", updateData };
        } catch (error: any) {
            console.error("Error updating schedule status:", error.message);
            throw new HttpException(error.message || "An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}