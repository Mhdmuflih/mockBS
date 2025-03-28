import { Document, Schema, Types, model } from "mongoose";

export interface IFeedback extends Document {
    candidateId: Types.ObjectId;
    interviewerId: Types.ObjectId;
    scheduledId: Types.ObjectId;
    slotId: Types.ObjectId;
    problemSolving: string;
    technology: string;
    communication: string;
    commants: string;
}

const feedbackSchema: Schema = new Schema(
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
        problemSolving: {
            type: String,
            required: true,
        },
        technology: {
            type: String,
            required: true,
        },
        communication: {
            type: String,
            required: true,
        },
        commants: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

export const Feedback = model<IFeedback>("Feedback", feedbackSchema);
