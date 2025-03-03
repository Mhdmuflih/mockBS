import { PartialType } from '@nestjs/mapped-types';
import { CreateInterviewerDto } from './create-interviewer.dto';

export class UpdateInterviewerDto extends PartialType(CreateInterviewerDto) {}
