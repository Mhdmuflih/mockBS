import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RTCScheduleRepository } from 'src/repository/rtc.respository';

interface RoomData {
  roomId: string;
  scheduleId: string;
}

// Store room details
const rooms: Record<string, string[]> = {}; // { roomId: [socketId1, socketId2] }
const socketToRoom: Record<string, string> = {}


@WebSocketGateway({ cors: { origin: '*' } })
export class WebrtcGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly scheduleRepository: RTCScheduleRepository) { }

  @WebSocketServer()
  server: Server;

  // Handle user connection
  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`User connected: ${socket.id}`);
  }

  // Handle user disconnection
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`User disconnected: ${socket.id}`);

    const roomId = socketToRoom[socket.id]; // Retrieve room ID
    console.log(roomId, 'this is room id for user desconnection');
    if (roomId && rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
      if (rooms[roomId].length === 0) {
        delete rooms[roomId]; // Clean up empty rooms
      }
    }

    delete socketToRoom[socket.id]; // Remove from tracking
  }


  // User joins a WebRTC room
  @SubscribeMessage('join-room')
  async handleJoinRoom(@MessageBody() data: RoomData, @ConnectedSocket() socket: Socket) {
    try {

      const { scheduleId } = data;

      // const roomdata = await this.scheduleRepository.getTheScheduleData(scheduleId);
      // console.log(roomdata, 'this is room data');
      console.log(data, 'this is data');

      if (!rooms[scheduleId]) {
        rooms[scheduleId] = [];
      }

      console.log(rooms[scheduleId], 'what is this')

      // Allow only 2 users in the room
      if (rooms[scheduleId].length < 2) {

        rooms[scheduleId].push(socket.id);
        socketToRoom[socket.id] = scheduleId;
        socket.join(scheduleId);
        console.log(rooms[scheduleId], 'what is this')
        console.log(`User ${socket.id} joined room ${scheduleId} with schedule ID ${scheduleId}`);
      }

      // If 2 users are present, start WebRTC signaling
      if (rooms[scheduleId].length === 2) {
        this.server.to(scheduleId).emit('ready');
      } else {
        socket.emit('waiting', 'Waiting for another user to join...');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(@MessageBody() data: { scheduleId: string }, @ConnectedSocket() socket: Socket) {
      const { scheduleId } = data;
      console.log(`User ${socket.id} is leaving room ${scheduleId}`);
  
      if (rooms[scheduleId]) {
          rooms[scheduleId] = rooms[scheduleId].filter(id => id !== socket.id);
          socket.leave(scheduleId);
  
          if (rooms[scheduleId].length === 0) {
              delete rooms[scheduleId];
          } else {
              this.server.to(scheduleId).emit('user-left', { message: "A user has left the room" });
          }
      }
  
      delete socketToRoom[socket.id];
  }

  // Handle WebRTC Offer
  @SubscribeMessage('offer')
  handleOffer(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    socket.to(data.scheduleId).emit('offer', data);
  }

  // Handle WebRTC Answer
  @SubscribeMessage('answer')
  handleAnswer(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    socket.to(data.scheduleId).emit('answer', data);
  }

  // Handle ICE Candidates
  @SubscribeMessage('ice-candidate')
  handleIceCandidate(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    socket.to(data.scheduleId).emit('ice-candidate', data);
  }
}
