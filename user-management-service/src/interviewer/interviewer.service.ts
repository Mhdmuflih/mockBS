// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// // import { IInterviewer } from './Model/interviewer.schema';
// import * as bcrypt from 'bcryptjs';
// import { IInterviewer } from './interface/interface';

// @Injectable()
// export class InterviewerService {
//   constructor(
//     @InjectModel('Interviewer') private readonly interviewerModel: Model<IInterviewer>
//   ) { }

//   async addDetails(formData: any, files: Express.Multer.File[]) {

//     const updateInterviewerDetails = await this.interviewerModel.findOneAndUpdate(
//       { email: formData.email },
//       {
//         $set: {
//           yearOfExperience: formData.experience,
//           currentDesignation: formData.designation,
//           organization: formData.organization,
//           university: formData.university,
//           introduction: formData.introduction,
//           isDetails: true,
//           profileURL: files[0],
//           salarySlipURL: files[1],
//           resumeURL: files[2]
//         }
//       }, { new: true, upsert: true })

//     if (!updateInterviewerDetails) {
//       throw new Error("Interviewer not found.");
//     }

//     console.log(updateInterviewerDetails, 'this is update interviewer details');

//     return { success: true, message: 'Details added successfully', interviewerData: updateInterviewerDetails };
//   }

//   async findOneById(userId: string) {
//     try {
//       const interviewerData = await this.interviewerModel.findOne({ _id: userId });
//       if (!interviewerData) {
//         throw new Error('Interviewer not found.');
//       }
//       return { success: true, message: "Candidate Data.", interviewerData };
//     } catch (error: any) {
//       console.error('Error fetching candidate details:', error);
//       return { success: false, message: 'Failed to fetch candidate details!' };
//     }
//   }

//   async changePassword(userId: string, formData: { currentPassword: string, password: string, confirmPassword: string }) {
//     try {
//       // Find the interviewer by userId
//       const interviewer = await this.interviewerModel.findOne({ _id: userId });
//       if (!interviewer) {
//         throw new Error('Interviewer not found.');
//       }

//       // Compare the current password with the stored one
//       const isMatch = await bcrypt.compare(formData.currentPassword, interviewer.password);
//       if (!isMatch) {
//         throw new Error('Current password is incorrect');
//       }

//       // If passwords match, hash the new password
//       const hashedPassword = await bcrypt.hash(formData.password, 10); // 10 is the salt rounds

//       // Update the password in the database without saving the whole object
//       const updatedInterviewer = await this.interviewerModel.findOneAndUpdate(
//         { _id: userId },
//         { $set: { password: hashedPassword } },
//         { new: true }  // Return the updated document
//       );

//       if (!updatedInterviewer) {
//         throw new Error('Failed to update the password');
//       }

//       return { success: true, message: 'Password updated successfully' };
//     } catch (error: any) {
//       console.error('Error updating password:', error.message);
//       return { success: false, message: error.message || 'Failed to update password' };
//     }
//   }

// }
