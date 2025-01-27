import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICandidate } from './Model/candidate.schema';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class CandidateService {

  constructor(
    @InjectModel('Candidate') private readonly candidateModel: Model<ICandidate>,
  ) { }

  async findOneById(userId: string) {
    try {
      const candidateData = await this.candidateModel.findOne({ _id: userId });
      if (!candidateData) {
        throw new Error('Candidate not found.');
      }
      console.log(candidateData, 'this is candidateData fetching in profile')
      return { success: true, message: "Candidate Data.", candidateData: candidateData };
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      return { success: false, message: 'Failed to fetch candidate details!' };
    }
  }

  async changePassword(userId: string, formData: { currentPassword: string, password: string, confirmPassword: string }) {
    try {
      // Find the candidate by userId
      const candidate = await this.candidateModel.findOne({ _id: userId });
      if (!candidate) {
        throw new Error('Candidate not found.');
      }

      // Compare the current password with the stored one
      const isMatch = await bcrypt.compare(formData.currentPassword, candidate.password);
      if (!isMatch) {
        throw new Error('Current password is incorrect');
      }

      // If passwords match, hash the new password
      const hashedPassword = await bcrypt.hash(formData.password, 10); // 10 is the salt rounds

      // Update password in the database without saving the whole object
      const updatedCandidate = await this.candidateModel.findOneAndUpdate(
        { _id: userId },
        { $set: { password: hashedPassword } },
        { new: true }  // Return the updated document
      );

      if (!updatedCandidate) {
        throw new Error('Failed to update the password');
      }

      return { success: true, message: 'Password updated successfully' };
    } catch (error: any) {
      console.error('Error updating password:', error.message);
      return { success: false, message: error.message || 'Failed to update password' };
    }
  }
}
