import { ICandidate, IInterviewer, IScheduled, ISlotData, IStack } from "./interface";
import { Stripe } from "stripe";

export interface ISuccess  {
    success: boolean;
    message: string;
}

export interface IPagination {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
}

// HOME page fetch
// ------------------------------------------------------------
export interface ICandidateHomeApiResponse  extends ISuccess{
    stackData: IStack[];
}


// HOME page show interviewer data fetch
// ------------------------------------------------------------
export interface ICandidateHomeInterviewerApiResponse extends ISuccess {
    matchedData: { interviewers: IInterviewer[] }
}


// HOME page serched interviewer slot data fetch
// ------------------------------------------------------------
export interface ISlotInterviewerApiResponse extends ISuccess{
    interviewerData: IInterviewer;
    slotData: ISlotData[]
}


// PROFILE date fetch
// ------------------------------------------------------------
export interface ICandidateProfileApiResponse extends ISuccess{
    candidateData: ICandidate
}


// SCHEDULED INTERVIEW fetch data 
// ------------------------------------------------------------
export interface IScheduledApiResponse extends ISuccess {
    scheduledData: {
        scheduledInterview: IScheduled[],
        currentPage: number;
        totalPages: number;
        totalRecords: number;
    }
}


// SCHEDULED INTERVIEW DETAILS fetch interview data
// ------------------------------------------------------------
export interface ICandidateGetInterviewerDetails extends ISuccess {
    interviewerData: IInterviewer
}


// SCHEDULED INTERVIEW COUND ANALITICS fetch data
// ------------------------------------------------------------
export interface ICandidateScheduledAnalyiticsApiResponse extends ISuccess {
    counts: {
        completedInterviewCounts: number;
        scheduledInterviewCounts: number;
    }
}


// SCHEDULED INTERVIEW PAYEMNT AMOUNT ANALITICS fetch data 
// ------------------------------------------------------------
export interface ICandidatePaymentAnalyiticsApiResponse extends ISuccess {
    totalAmount: number
}


// PREMIUM PAYEMNT response 
// ------------------------------------------------------------
export interface ICandidatePremiumApiResponse extends ISuccess {
    session: Stripe.Checkout.Session
}


// SIGNUP CANDIDATE response 
// ------------------------------------------------------------
export interface ICandidateSignupApiResponse extends ISuccess {
    candidateData: ICandidate
}


// LOGIN CANDIDATE response
// ------------------------------------------------------------
export interface ICandidateLoginApiResponse extends ISuccess {
    token: string;
    refreshToken: string;
    candidateData: ICandidate
}


// FORGOT PASSWORD response 
// ------------------------------------------------------------
export interface ICandidateForgotPasswordApiResponse extends ISuccess {
    candidateData: ICandidate
}