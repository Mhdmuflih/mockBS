import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InterviewerSlot } from "src/interviewer/model/interviewer-slot.schema";
import { ICandidateSlotRepository } from "../interface/ICandidateSlotRepository";

@Injectable()
export class SlotRepository implements ICandidateSlotRepository {
    constructor(
        @InjectModel(InterviewerSlot.name) private readonly slotModel: Model<InterviewerSlot>
    ) { }

    async getMatchSlot(tech: string): Promise<any> {
        try {
            const getMatchedSlotData = await this.slotModel.find({ "stack.technologies": tech }).exec();
            return getMatchedSlotData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getSlotInterviewerDetails(interviewerId: string, tech: string): Promise<any> {
        try {
            const slotInterviewerDetails = await this.slotModel.find({ interviewerId: interviewerId, "stack.technologies": tech });
            if (!slotInterviewerDetails) {
                throw new HttpException('No slots found for this interviewer and technology.', HttpStatus.NOT_FOUND);
            }
            return slotInterviewerDetails;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateScheduleDataStatus(scheduleData: any): Promise<any> {
        try {
            const updateData = await this.slotModel.updateOne(
                {
                    interviewerId: scheduleData.interviewerId,  // Match interviewerId
                    "slots.schedules._id": scheduleData.scheduledSlot.scheduleId // Find the specific schedule
                },
                {
                    $set: { "slots.$[].schedules.$[sched].status": "booked" } // Update status to "booked"
                },
                {
                    arrayFilters: [{ "sched._id": scheduleData.scheduledSlot.scheduleId }] // Apply filter to target correct schedule
                }
            );

            if (updateData.matchedCount === 0) {
                throw new HttpException("Schedule not found", HttpStatus.NOT_FOUND);
            }

            return updateData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || "An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}