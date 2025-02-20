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
  @IsOptional()
  password: string;

  @IsBoolean()
  isBlocked: boolean;

  @IsBoolean()
  isVerified: boolean;

  @IsOptional()
  @IsString()
  OTP?: number;

  @IsOptional()
  expaireAt?: Date;
}
