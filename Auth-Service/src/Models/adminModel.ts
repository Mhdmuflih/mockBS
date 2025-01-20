import { Document, model, Schema } from "mongoose";



export interface IAdmin extends Document {
    name: string;
    mobile: string;
    email: string;
    password: string;
    isBlocked?: boolean;
    isVerified?: boolean;
}




const adminSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default model<IAdmin>("Admin", adminSchema)