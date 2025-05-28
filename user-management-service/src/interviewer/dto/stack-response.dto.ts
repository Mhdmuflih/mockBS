import { IStack } from "src/candidate/interface/interface";

export class StackDTO {
    public _id: string;
    public stackName: string;
    public technologies?: string[];

    constructor(stack: IStack) {
        this._id = stack._id.toString();
        this.stackName = stack.stackName;
        this.technologies = stack.technologies;
    }

    static from(stack: IStack): StackDTO {
        return new StackDTO(stack);
    }

    static fromList(stacks: IStack[]): StackDTO[] {
        return stacks.map(StackDTO.from);
    }
}
