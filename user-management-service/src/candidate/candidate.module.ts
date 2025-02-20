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
import { Stack, StackSchema } from 'src/admin/Model/stack.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Candidate.name,
      schema: CandidateSchema
    }]),
    
    MulterModule.register({ dest: './uploads/Profile' }),

    MongooseModule.forFeature([{
      name: Stack.name,
      schema: StackSchema
    }]),
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
