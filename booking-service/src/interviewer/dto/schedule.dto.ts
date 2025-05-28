import { ISchedule } from "src/interface/interface";

export class ScheduleDTO {
    public _id: string;
    public candidateId: string;
    public interviewerId: string;
    public scheduleId: string;
    public scheduledSlot: {
        stack: string;
        technology: string;
        date: string;
        from: string;
        to: string;
        title: string;
        price: number;
    };
    public status: string;
    public cancelReason?: string;

    constructor(schedule: ISchedule) {
        this._id = schedule._id.toString();
        this.candidateId = schedule.candidateId.toString();
        this.interviewerId = schedule.interviewerId.toString();
        this.scheduleId = schedule.scheduleId.toString();
        this.scheduledSlot = {
            stack: schedule.scheduledSlot.stack,
            technology: schedule.scheduledSlot.technology,
            date: schedule.scheduledSlot.date,
            from: schedule.scheduledSlot.from,
            to: schedule.scheduledSlot.to,
            title: schedule.scheduledSlot.title,
            price: schedule.scheduledSlot.price,
        };
        this.status = schedule.status;
        this.cancelReason = schedule.cancelReason;
    }

    // Optional: static mapper methods
    static from(schedule: ISchedule): ScheduleDTO {
        return new ScheduleDTO(schedule);
    }

    static fromList(schedules: ISchedule[]): ScheduleDTO[] {
        return schedules.map(ScheduleDTO.from);
    }
}
