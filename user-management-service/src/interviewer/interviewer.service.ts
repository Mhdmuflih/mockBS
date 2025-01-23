import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IInterviewer } from './Model/interviewer.schema';
import { CreateInterviewerDto } from './dto/create-interviewer.dto';

@Injectable()
export class InterviewerService {
  constructor(
    @InjectModel('Interviewer') private readonly interviewerModel: Model<IInterviewer>, // Inject the model, not the schema
  ) { }

  async updateDetails(bodyData: CreateInterviewerDto) {
    try {
      const { formData, email }: any = bodyData;
      if (!formData || !email) {
        return { success: false, message: "All fields are required." }
      }

      const addInterviewerDetails = await this.interviewerModel.findOneAndUpdate(
        { email: email }, // Filter by email
        {
          $set: {
            yearOfExperience: formData.experience,
            currentDesignation: formData.designation,
            organization: formData.organization,
            university: formData.university,
            introduction: formData.introduction,
            isDetails: true // Marking as details added
          }
        },
        { new: true } // Return the updated document)
      );

      if (!addInterviewerDetails) {
        throw new Error('Interviewer not found.');
      }

      return { success: true, message: "Interviewer Data is Added.", interviewerData: addInterviewerDetails };

    } catch (error: any) {
      console.error('Error sending OTP:', error);
      return { success: false, message: 'Failed to add interviewer details!' };
    }
  }


  // create(createInterviewerDto: CreateInterviewerDto) {
  //   console.log("koi kokii jndjfnsdjnfsdjnfsujjnj")
  //   return 'This action adds a new interviewer';
  // }

  // findAll() {
  //   return `This action returns all interviewer`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} interviewer`;
  // }

  // update(id: number, updateInterviewerDto: UpdateInterviewerDto) {
  //   return `This action updates a #${id} interviewer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} interviewer`;
  // }
}
