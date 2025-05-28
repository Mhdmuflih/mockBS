import { IInterviewer } from "../interface/interface";

// interviewer.dto.ts
export class InterviewerDTO {
    public _id: string;
    public name: string;
    public email: string;
    public mobile: string;
    public profileURL?: string;
    public isVerified?: boolean;
    public isApproved?: boolean;
    public isDetails?: boolean;
    public currentDesignation?: string;
    public yearOfExperience?: number;
    public university?: string;
    public organization?: string;
    public introduction?: string;

    constructor(interviewer: IInterviewer) {
        this._id = interviewer._id.toString();
        this.name = interviewer.name;
        this.email = interviewer.email;
        this.mobile = interviewer.mobile;
        this.profileURL = interviewer.profileURL;
        this.isVerified = interviewer.isVerified;
        this.isApproved = interviewer.isApproved;
        this.isDetails = interviewer.isDetails;
        this.currentDesignation = interviewer.currentDesignation;
        this.yearOfExperience = interviewer.yearOfExperience;
        this.university = interviewer.university;
        this.organization = interviewer.organization;
        this.introduction = interviewer.introduction;
    }

    static from(interviewer: IInterviewer): InterviewerDTO {
        return new InterviewerDTO(interviewer);
    }

    static fromList(interviewers: IInterviewer[]): InterviewerDTO[] {
        return interviewers.map(this.from);
    }
}
