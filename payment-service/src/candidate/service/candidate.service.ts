import { Injectable } from '@nestjs/common';
import { ICandidateService } from '../interface/ICandidateService';
import { CandidateRepository } from '../repository/candidate.repository';

@Injectable()
export class CandidateService implements ICandidateService {
  constructor(private readonly candidateRepository: CandidateRepository) { }
}
