import { Document, model, Schema, Types } from "mongoose";

export interface IRating extends Document {
    candidateId: Types.ObjectId;
    interviewerId: Types.ObjectId;
    scheduledId: Types.ObjectId;
    slotId: Types.ObjectId;
    ratings: number,
    comment: string
}

const ratingSchema = new Schema(
    {
        candidateId: {
            type: Types.ObjectId,
            required: true,
            ref: "Candidate", // Reference to Candidate model
        },
        interviewerId: {
            type: Types.ObjectId,
            required: true,
            ref: "Interviewer", // Reference to Interviewer model
        },
        scheduledId: {
            type: Types.ObjectId,
            required: true,
            ref: "Schedule", // Reference to Schedule model
        },
        slotId: {
            type: Types.ObjectId,
            required: true,
            ref: "Slot", // Reference to Slot model
        },
        ratings: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            require: true
        }
    }
);

export const ReviewRating = model<IRating>("ReviewRating", ratingSchema);
