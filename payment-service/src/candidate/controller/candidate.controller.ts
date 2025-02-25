import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CandidateService } from '../service/candidate.service';
import { ICandidateController } from '../interface/ICandidateController';


@Controller('candidate')
export class CandidateController implements ICandidateController {
  constructor(private readonly candidateService: CandidateService) {}

}
