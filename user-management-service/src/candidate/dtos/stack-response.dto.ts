import { IsArray, IsOptional, IsString } from "class-validator";

export class StackResponseDto {
    @IsString()
    stackName: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    technologies?: string[];
}

export class GetStackResponseDto {
    success: boolean;
    message: string;
    stackData: StackResponseDto[] | null
}