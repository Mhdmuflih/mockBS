import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, isNumber, IsOptional, IsString } from "class-validator";

export class CandidateDataDto {
    @IsString()
    name: string;

    @IsString()
    mobile: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    profileURL?: string

    @IsBoolean()
    @IsOptional()
    isBlocked?: boolean;

    @IsBoolean()
    @IsOptional()
    isVerified?: boolean;

    @IsOptional()
    OTP?: number;

    @IsOptional()
    expaireAt?: Date;
}




export class UpdateCandidateDto extends PartialType(CandidateDataDto) {}
