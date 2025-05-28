import { IInterviewer } from "../../Models/interviewerModel";

export class InterviewerDTO {
    public _id: string;
    public name: string;
    public email: string;
    public mobile: string;
    public isBlocked?: boolean;
    public isVerified?: boolean;
    public isApproved?: boolean;
    public isDetails?: boolean;
    public currentDesignation?: string;
    public yearOfExperience?: number;
    public university?: string;
    public organization?: string;
    public introduction?: string;
    public profileURL?: string;
    public resumeURL?: string;
    public salarySlipURL?: string;



    constructor(interviewer: IInterviewer) {
        this._id = interviewer._id.toString();
        this.name = interviewer.name;
        this.email = interviewer.email;
        this.mobile = interviewer.mobile;
        this.isBlocked = interviewer.isBlocked;
        this.isVerified = interviewer.isVerified;
        this.isApproved = interviewer.isApproved;
        this.isDetails = interviewer.isDetails;
        this.currentDesignation = interviewer.currentDesignation;
        this.yearOfExperience = interviewer.yearOfExperience;
        this.university = interviewer.university;
        this.organization = interviewer.organization;
        this.introduction = interviewer.introduction;
        this.profileURL = interviewer.profileURL;
        this.resumeURL = interviewer.resumeURL;
        this.salarySlipURL = interviewer.salarySlipURL;
    }

    static from(interviewer: IInterviewer): InterviewerDTO {
        return new InterviewerDTO(interviewer);
    }

    static fromList(interviewers: IInterviewer[]): InterviewerDTO[] {
        return interviewers.map(InterviewerDTO.from);
    }
}
