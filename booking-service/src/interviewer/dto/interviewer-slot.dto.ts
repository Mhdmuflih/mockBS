import { IsNotEmpty, IsString, IsNumber, IsArray, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class ScheduleDto {
    @IsNotEmpty()
    @IsString()
    fromTime: string;

    @IsNotEmpty()
    @IsString()
    toTime: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    status: string;
}

export class SlotDto {
    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ScheduleDto)
    schedules: ScheduleDto[];
}

export class StackDto {
    @IsNotEmpty()
    @IsString()
    stackName: string;

    @IsNotEmpty()
    @IsString()
    technologies: string;
}

export class InterviewerSlotDto {
    @IsNotEmpty()
    interviewerId: Types.ObjectId;

    @ValidateNested()
    @Type(() => StackDto)
    stack: StackDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SlotDto)
    slots: SlotDto[];
}
