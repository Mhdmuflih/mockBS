import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICandidate } from './Model/candidate.schema';

@Injectable()
export class CandidateService {

  constructor(
    @InjectModel('Candidate') private readonly candidateModel: Model<ICandidate>,
  ) { }

  async findOneById(userId: string) {
    try {
      const candidateData = await this.candidateModel.findOne({ _id:userId });
      if (!candidateData) {
        throw new Error('Candidate not found.');
      }
      console.log(candidateData,'this is candidateData fetching in profile')
      return { success: true, message: "Candidate Data.", candidateData: candidateData };
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      return { success: false, message: 'Failed to fetch candidate details!' };
    }
  }

  // create(createCandidateDto: CreateCandidateDto) {
  //   return 'This action adds a new candidate';
  // }

  // findAll() {
  //   return `This action returns all candidate`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} candidate`;
  // }

  // update(id: number, updateCandidateDto: UpdateCandidateDto) {
  //   return `This action updates a #${id} candidate`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} candidate`;
  // }
}
