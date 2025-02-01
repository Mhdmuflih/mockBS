import { Module } from '@nestjs/common';
// import { CandidateService } from './candidate.service';
// import { CandidateController } from './candidate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidate, CandidateSchema } from './Model/candidate.schemas';
import { CandidateController } from './controllers/candidate.controller';
import { CandidateService } from './services/candidate.service';
import { CandidateRepository } from './repository/candidate.repository';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/Config/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Candidate.name,
      schema: CandidateSchema
    }]),
    MulterModule.register({ dest: './uploads/Profile' }),

  ],
  controllers: [CandidateController],
  providers: [
    CandidateService,
    CandidateRepository,
    CloudinaryService
  ],
  exports: [MongooseModule]
})
export class CandidateModule { }
