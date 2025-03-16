// candidate-response.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CandidateResponseDto {
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
