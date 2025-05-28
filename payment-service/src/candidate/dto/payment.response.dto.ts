import { IPayment } from "../interface/Interface";

export class PaymentDTO {
    public _id: string;
    public transactionId: string;
    public slotId: string;
    public candidateId: string;
    public scheduleId: string;
    public interviewerId: string;
    public interviewerName: string;
    public amount: number;
    public scheduleData: {
        stack: string;
        technology: string;
        date: string;
        from: string;
        to: string;
        title: string;
        price: number;
    };
    public status: string;
    public paymentMethod: string;
    public createdAt: Date;

    constructor(payment: IPayment) {
        this._id = payment._id.toString();
        this.transactionId = payment.transactionId;
        this.slotId = payment.slotId.toString();
        this.candidateId = payment.candidateId.toString();
        this.scheduleId = payment.scheduleId.toString();
        this.interviewerId = payment.interviewerId.toString();
        this.interviewerName = payment.interviewerName;
        this.amount = payment.amount;
        this.scheduleData = {
            stack: payment.scheduleData.stack,
            technology: payment.scheduleData.technology,
            date: payment.scheduleData.date,
            from: payment.scheduleData.from,
            to: payment.scheduleData.to,
            title: payment.scheduleData.title,
            price: payment.scheduleData.price,
        };
        this.status = payment.status;
        this.paymentMethod = payment.paymentMethod;
        this.createdAt = payment.createdAt;
    }

    // Optional: static helpers
    static from(payment: IPayment): PaymentDTO {
        return new PaymentDTO(payment);
    }

    static fromList(payments: IPayment[]): PaymentDTO[] {
        return payments.map(PaymentDTO.from);
    }
}
