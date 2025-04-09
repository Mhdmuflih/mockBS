import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GroupChatRepoitory } from "./repository/group-chat.repository";
import { MessageRepository } from "./repository/chat.repository";
import { IChatService } from "./interface/IChatService";

@Injectable()
export class ChatService implements IChatService {
    constructor(
        private readonly groupRepository: GroupChatRepoitory,
        private readonly messageRepository: MessageRepository
    ) { }

    async createGroup(candidateId: string, groupName: string): Promise<any> {
        try {
            const existingGroup = await this.groupRepository.findGroup(groupName.toLocaleLowerCase());
            if (existingGroup) {
                throw new HttpException(
                    'This group already exists in the community. Change the group name.',
                    HttpStatus.CONFLICT, // 409 instead of 500
                );
            }
            const createdGroup = await this.groupRepository.createGroup(candidateId, groupName.toLocaleLowerCase());
            console.log(createdGroup, "createdGroup");
            return createdGroup;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllGroups() {
        try {
            const groups = await this.groupRepository.findGroups();
            return groups;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async joinGroup(candidateId: string, groupName: string) {
        try {
            const existingMember = await this.groupRepository.findTheExisitingMember(candidateId, groupName)
            if(existingMember) {
                throw new Error("This candidate already joined this group");
            }
            const joinGroup = await this.groupRepository.joinMember(candidateId, groupName);
            return joinGroup;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getGroupHistory(groupName: string) {
        try {
            const history = await this.messageRepository.getGroupHistory(groupName);
            // if(history) {
            //     const updateStatus = await this.messageRepository.updateReadMessage(groupName);
            // }
            console.log(history,' this is history');
            return history;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async sendMessage(candidateId: string, candidateName: string, groupName: string, message: string) {
        try {
            const sendMessage = await this.messageRepository.saveMessage(candidateId, candidateName, groupName,message);
            return sendMessage;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}