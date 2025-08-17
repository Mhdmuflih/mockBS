import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: "/chat" }) // Ensure it runs on the correct port
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server

    constructor(private readonly chatService: ChatService) { }

    // Called when a client connects
    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    // Called when a client disconnects
    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage("createGroup")
    async handleToCreateGroup(client: Socket, @MessageBody() data: [candidateId: string, groupName: string]) {
        try {
            const [candidateId, groupName] = data;

            console.log(candidateId, groupName, 'this is that')
            if (!data || !candidateId || !groupName) {
                throw new WsException('Invalid data. candidateId and groupName are required.');
            }
            const createGroup = await this.chatService.createGroup(candidateId, groupName);
            console.log(createGroup, 'this is the chat gateway of the last part');
            this.server.emit("groupCreated", createGroup);
        } catch (error: any) {
            console.error('Error in handleCreateGroup:', error);
            throw new WsException('Something went wrong');
        }
    }

    @SubscribeMessage("getGroups")
    async getAllGroups(client: Socket) {
        try {
            const groups: any = await this.chatService.getAllGroups();
            client.emit("groupList", groups);
        } catch (error: any) {
            console.error('Error in handleCreateGroup:', error);
            throw new WsException('Something went wrong');
        }
    }

    @SubscribeMessage("joinMember")
    async joinMember(client: Socket, data: { candidateId: string; groupName: string }) {
        try {
            const joinedGroup = await this.chatService.joinGroup(data.candidateId, data.groupName);
            console.log(joinedGroup, 'this is joinedGroup');
            this.server.emit("joinedGroup", joinedGroup);
        } catch (error: any) {
            console.error('Error in join Member:', error);
            throw new WsException('Something went wrong');
        }
    }

    @SubscribeMessage("getGroupMembers")
    async getGroupMembers(client: Socket, @MessageBody() groupName: string) {
        console.log("Received getGroupMembers event from client");
        console.log("Group name:", groupName);

        try {
            const members = await this.chatService.getGroupMembers(groupName);
            console.log("Fetched members:", members);
            this.server.emit("getGroupMembers", members);
        } catch (error: any) {
            console.error("Error fetching group members:", error);
            throw new WsException("Failed to fetch group members");
        }
    }

    @SubscribeMessage("messageHistory")
    async messageHistory(client: Socket, groupName: string) {
        try {
            console.log(groupName, 'this is the group history');
            const groupHistoryData = await this.chatService.getGroupHistory(groupName);
            console.log(groupHistoryData, 'this is group history data');
            this.server.emit("messageHistory", groupHistoryData);
        } catch (error: any) {
            console.error('Error in join Member:', error);
            throw new WsException('Something went wrong');
        }
    }

    @SubscribeMessage("sendMessage")
    async sendMessage(client: Socket, data: { candidateId: string, candidateName: string, message: string, groupName: string }) {
        try {
            console.log(data, 'data');
            const sendMessage = await this.chatService.sendMessage(data.candidateId, data.candidateName, data.groupName, data.message);
            console.log(sendMessage, 'this is last message');
            this.server.emit("receiveMessage", sendMessage);
        } catch (error: any) {
            console.error('Error in join Member:', error);
            throw new WsException('Something went wrong');
        }
    }

}