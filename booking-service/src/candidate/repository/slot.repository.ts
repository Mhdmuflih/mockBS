import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InterviewerSlot } from "src/interviewer/model/interviewer-slot.schema";
import { ICandidateSlotRepository } from "../interface/ICandidateSlotRepository";
import { BaseRepository } from "src/repository/base.respository";
import { IInterviewerSlot } from "src/interface/interface";

@Injectable()
export class SlotRepository extends BaseRepository<InterviewerSlot> implements ICandidateSlotRepository {
    constructor(
        @InjectModel(InterviewerSlot.name) private readonly slotModel: Model<InterviewerSlot>
    ) {
        super(slotModel)
    }

    async getMatchSlot(tech: string): Promise<IInterviewerSlot[]> {
        try {
            const getMatchedSlotData = await this.slotModel.find({ "stack.technologies": tech }).exec();
            return getMatchedSlotData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateSlotInterviewerExpire(interviewerId: string, tech: string): Promise<any> {
        try {
            const now = new Date();
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const updateData = await this.slotModel.updateMany(
                {
                    interviewerId: interviewerId,
                    "stack.technologies": tech,
                    "slots.date": { $lt: today }
                },
                { $set: { "slots.$[slot].schedules.$[sched].status": "expired" } },
                {
                    arrayFilters: [
                        { "slot.date": { $lt: today } },
                        {
                            "sched.status": { $nin: ["expired", "booked"] },
                            "sched.fromTime": { $lt: now.toTimeString().slice(0, 5) }
                        }
                    ]
                }
            );

            return updateData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getSlotInterviewerDetails(interviewerId: string, tech: string): Promise<IInterviewerSlot[]> {
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
                    "slots.schedules._id": scheduleData.scheduledId // Find the specific schedule
                },
                {
                    $set: { "slots.$[].schedules.$[sched].status": "booked" } // Update status to "booked"
                },
                {
                    arrayFilters: [{ "sched._id": scheduleData.scheduledId }] // Apply filter to target correct schedule
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



    async updateScheduleDataStatusCancelled(scheduledId: string): Promise<any> {
        try {
            const updateData = await this.slotModel.updateOne(
                {
                    "slots.schedules._id": scheduledId // Find the specific schedule
                },
                {
                    $set: { "slots.$[].schedules.$[sched].status": "open" } // Update status to "booked"
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