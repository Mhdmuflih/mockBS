export class CreateInterviewerDto {
    readonly name: string;
    readonly mobile: string;
    readonly email: string;
    readonly password?: string; // Optional if not being updated
    readonly OTP?: number;
    readonly currentDesignation?: string;
    readonly yearOfExperience?: number;
    readonly university?: string;
    readonly organization?: string;
    readonly introduction?: string;
    readonly profileURL?: string;
    readonly resumeURL?: string;
    readonly salarySlipURL?: string;
  }
  