import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import candidateSchema from './Model/candidate.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Candidate', schema: candidateSchema }]),
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
  exports:[MongooseModule]
})
export class CandidateModule {}
