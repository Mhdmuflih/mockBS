import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InterviewerSlot } from "../model/interviewer-slot.schema";
import { Model } from "mongoose";
import { IInterviewerSlotRepository } from "../interface/IInterviewerSlotRepository";

@Injectable()
export class interviewerSlotRepository implements IInterviewerSlotRepository {
    constructor(
        @InjectModel(InterviewerSlot.name) private readonly slotModel: Model<InterviewerSlot>
    ) { }

    async create(interviewerId: string, formData: any): Promise<any> {
        try {
            const newSlot = new this.slotModel({
                interviewerId: interviewerId,
                stack: formData.stack,
                slots: formData.slots
            });

            const savedSlot = await newSlot.save();
            return savedSlot;

        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateScheduleData(interviewerId: string, updatedSchedule: any, date: any): Promise<any> {
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

    async getSlot(interviewerId: string): Promise<any> {
        try {
            const slotData = await this.slotModel.find({ interviewerId: interviewerId })
            return slotData;
        } catch (error: any) {
            console.log(error.message);
        }
    }

}