import { ObjectId } from "mongoose";
import { ICandidate } from "./candidateInterfaces/interface";

// export interface ICandidate {
//     _id: ObjectId;
//     name: string;
//     email: string;
//     mobile: number;
//     password: string;
//     is_Block: boolean;
//     is_Verfied: boolean
//     profileURL?: string
//     premium?: boolean
// }

export interface IInterviewer {
    _id: ObjectId;
    name: string;
    email: string;
    mobile: number;
    password: string;
    is_Block: boolean;
    is_Verfied: boolean;
    isDetails?: boolean;
    currentDesignation?: string;
    yearOfExperience?: number;
    university?: string;
    organization?: string;
    introduction?: string;
    profileURL?: string
}

export interface IAdmin {
    _id: ObjectId;
    name: string;
    email: string;
    mobile: number;
    password: string;
    is_Block: boolean;
    is_Verfied: boolean
}

export interface ReduxInitialStateManage {
    isLoggedIn: boolean;
    storedData?: IInterviewer | ICandidate | IAdmin | null;
    profileURL?: string;
    paymentSessionId?: string | null;
    change?: boolean
}

export interface LoginPayload {
    token: string;
    refreshToken: string;
    isLoggedIn: boolean;
    storedData: IAdmin | IInterviewer | ICandidate;
    image?: string | undefined;
    change?: boolean
}