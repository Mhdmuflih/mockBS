import { IInterviewerSlot } from "src/interface/interface";

export class InterviewerSlotDTO {
    public _id: string;
    public interviewerId: string;
    public stack: {
        stackName: string;
        technologies: string;
    };
    public slots: {
        date: Date;
        schedules: {
            fromTime: string;
            toTime: string;
            title: string;
            price: number;
            description: string;
            status: string;
        }[];
    }[];

    constructor(slot: IInterviewerSlot) {
        this._id = slot._id.toString();
        this.interviewerId = slot.interviewerId.toString(); // Convert ObjectId to string
        this.stack = {
            stackName: slot.stack.stackName,
            technologies: slot.stack.technologies,
        };
        this.slots = slot.slots.map(s => ({
            date: s.date,
            schedules: s.schedules.map(schedule => ({
                fromTime: schedule.fromTime,
                toTime: schedule.toTime,
                title: schedule.title,
                price: schedule.price,
                description: schedule.description,
                status: schedule.status,
            })),
        }));
    }

    static from(slot: IInterviewerSlot): InterviewerSlotDTO {
        return new InterviewerSlotDTO(slot);
    }

    static fromList(slots: IInterviewerSlot[]): InterviewerSlotDTO[] {
        return slots.map(InterviewerSlotDTO.from);
    }
}
