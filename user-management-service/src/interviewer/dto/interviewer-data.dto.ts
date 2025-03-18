import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class InterviewerDataDto {

    @IsString()
    name: string;

    @IsString()
    mobile: string;

    @IsString()
    email: string;

    @IsString()
    @IsOptional()
    password?: string

    @IsNumber()
    @IsOptional()
    OTP?: number;

    @IsString()
    @IsOptional()
    currentDesignation?: string;

    @IsNumber()
    @IsOptional()
    yearOfExperience?: number;

    @IsString()
    @IsOptional()
    university?: string;

    @IsString()
    @IsOptional()
    organization?: string;


    @IsString()
    @IsOptional()
    introduction?: string;

    @IsString()
    @IsOptional()
    profileURL?: string;

    @IsString()
    @IsOptional()
    resumeURL?: string;

    @IsString()
    @IsOptional()
    salarySlipURL?: string;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    expaireAt?: Date;

    @IsBoolean()
    @IsOptional()
    isBlocked?: boolean;

    @IsBoolean()
    @IsOptional()
    isVerified?: boolean;

    @IsBoolean()
    @IsOptional()
    isApproved?: boolean;

    @IsBoolean()
    @IsOptional()
    isDetails?: boolean;
}


export class UpdateInterviewerDto extends PartialType(InterviewerDataDto) { }
