import { Document, ObjectId, Types } from 'mongoose';

export interface IPayment extends Document {
    transactionId?: string;
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

interface ScheduleData {
    stack: string;
    technology: string;
    date: string;
    from: string;
    to: string;
    title: string;
    price: number;
    description: string;
    status: string;
    scheduleId: string;
    slotId: string;
  }
  
  export interface PaymentData {
    slotId: string;
    scheduleId: string;
    amount: number;
    interviewerId: string;
    interviewerName: string;
    scheduleData: ScheduleData;
  }



export interface IInterviewerWallet extends Document {
    interviewerId: Types.ObjectId;
    balance: number;
    walletHistory: {
        date: Date;
        amount: number;
        description: string;
        currentBalance: number;
    }[];
}

export interface ICandidateWallet extends Document {
    candidateId: Types.ObjectId;
    balance: number;
    walletHistory: {
        date: Date;
        amount: number;
        description: string;
        currentBalance: number;
    }[];
}