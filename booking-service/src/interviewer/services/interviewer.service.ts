import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IInterviewerSlotService } from '../interface/IInterviewerSlotService';
import { interviewerSlotRepository } from '../repository/interviewer.slot.repository';
import { ScheduleRepository } from '../repository/scheduled.repository';
import { IInterviewerSlot, ISchedule } from '../../interface/interface';


@Injectable()
export class InterviewerService implements IInterviewerSlotService {
  constructor(
    private readonly interviewerSlotRepository: interviewerSlotRepository,
    private readonly interviewerScheduledRepository: ScheduleRepository
  ) { }

  async addSlot(interviewerId: string, formData: any): Promise<IInterviewerSlot> {
    try {

      if(new Date(formData.date) < new Date()) {
        throw new Error("Selected date in Incorrect. please choose correct date");
      }
      
      const slotData = {
        stack: formData.stack,
        slots: [{
          date: new Date(formData.date).toISOString().split('T')[0],
          schedules: [{
            fromTime: formData.fromTime,
            toTime: formData.toTime,
            title: formData.title,
            price: parseFloat(formData.price),
            description: formData.description
          }]
        }]
      };

      const slotDetails = await this.interviewerSlotRepository.getSlot(interviewerId);

      // check cheyth stack name um technologies um match ayitt ulla ella data yum eduth
      const matchingSlot = slotDetails.filter((slot: any) => {
        if (slot.stack.stackName == formData.stack.stackName && slot.stack.technologies == formData.stack.technologies) {
          return slot
        }
      });

      let date: Date;
      let isUpdate = false;

      // evide check cheyth athill ulla date um formdata yil vannd date um correct ayitt ulla data edth. 
      if (matchingSlot) {
        matchingSlot.forEach((slot: any) => {
          const dateSlot = slot.slots.find((dateSlot: any) => {
            const slotDate = new Date(dateSlot.date).toISOString().split('T')[0]; // this is convert into this model Convert to YYYY-MM-DD
            const formDate = new Date(formData.date).toISOString().split('T')[0]; // this is convert into this model Convert to YYYY-MM-DD
            // console.log(slotData, formData, 'slotdate formdate')
            return slotDate == formDate;
          });

          // aa data yill ninn time 2 um check cheyth add akkunna time um nilavill ulla time um same anagill error throw cheyyum 
          // allengill ividan aa date oru varible kk vech pinne is update true akki vidum ith true anangil avide update akkum athille schedule array kk push akkum data nne
          if(dateSlot) {
            dateSlot.schedules.forEach((scheduled: any) => {
              const checkTime = scheduled.fromTime == formData.fromTime || scheduled.toTime == formData.toTime;
              if(checkTime) {
                throw new Error("Your already added this time. Change this time");
              }else {
                date = dateSlot.date
                isUpdate = true;
              }
            })
          }
        })
      }

      if(isUpdate) {
        return await this.interviewerSlotRepository.updateScheduleData(interviewerId, slotData, date);
      }else {
        const addSlot = await this.interviewerSlotRepository.create(interviewerId, slotData);
        return addSlot;
      }

    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async getSlot(interviewerId: string, page: number, limit: number, search?: string): Promise<{getSlotData: IInterviewerSlot[], totalRecords: number, totalPages:number, currentPage: number}> {
    try {
      const getSlotData = await this.interviewerSlotRepository.findWithPagination({interviewerId}, page, limit, search);
      // const getSlotData = await this.interviewerSlotRepository.getAllSlots(interviewerId, page, limit, search);
      // console.log(getSlotData[0].slots, 'this is get slot data')
      return {
        getSlotData: getSlotData.data,
        totalRecords: getSlotData.total,
        totalPages: Math.ceil(getSlotData.total / limit),
        currentPage:page        
      };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSheduledInterviews(interviewerId: string, page: number, limit: number, search: string): Promise<{scheduledData:ISchedule[], totalRecords: number, totalPages: number, currentPage: number}> {
    try {
      const scheduledData = await this.interviewerScheduledRepository.findWithPagination({interviewerId}, page, limit, search);
      // const scheduledData =  await this.interviewerScheduledRepository.scheduledInterviews(interviewerId, page, limit, search);
      return {
        scheduledData: scheduledData.data,
        totalRecords: scheduledData.total,
        totalPages: Math.ceil(scheduledData.total / limit),
        currentPage:page        
      };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
