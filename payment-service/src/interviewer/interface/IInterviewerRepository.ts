import { IPayment } from "./interface";

export interface IInterviewerRepository {
    getPaymentHistoryData(interviewerId: string): Promise<IPayment[]>
}