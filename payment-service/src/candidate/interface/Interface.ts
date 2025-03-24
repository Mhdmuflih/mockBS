import { Types } from 'mongoose';

export interface IPayment {
    _id?: Types.ObjectId;
    slotId: Types.ObjectId;
    scheduleId: Types.ObjectId;
    candidateId: Types.ObjectId;
    interviewerId: Types.ObjectId;
    interviewerName: string;
    scheduleData: {
        stack: string;
        technology: string;
        date: string;
        from: string;
        to: string;
        title: string;
        price: number;
    };
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'admin send';
    paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer';
    transactionId: string;
    createdAt?: Date;
}




export interface IWallet {
    _id?: Types.ObjectId;
    interviewerId: Types.ObjectId;
    balance: number;
    walletHistory: {
        date: Date;
        amount: number;
        description: string;
        currentBalance: number;
    }[];
}
