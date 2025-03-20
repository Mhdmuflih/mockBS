import { StackResponseDto } from "../dto/stack-response.dto";

export interface IInterviewerStackRepository {
    fetchStack(): Promise<StackResponseDto[]>;
}