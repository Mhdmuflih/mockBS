import { Document, Types } from 'mongoose';

export interface IPayment extends Document {
    transactionId: string;
    slotId: string | Types.ObjectId;
    candidateId: string | Types.ObjectId;
    scheduleId: string | Types.ObjectId;
    interviewerId: string | Types.ObjectId;
    interviewerName: string;
    amount: number;
    scheduleData: {
        stack: string;
        technology: string;
        date: string;
        from: string;
        to: string;
        title: string;
        price: number;
    };
    status: string;
    paymentMethod: string;
    createdAt: Date;
}




export interface IWallet extends Document {
    interviewerId: Types.ObjectId;
    balance: number;
    walletHistory: {
        date: Date;
        amount: number;
        description: string;
        currentBalance?: number;
    }[];
}
